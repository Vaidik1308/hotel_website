import { NextResponse } from "next/server";
import Stripe from "stripe";
import hotelRoom from "../../../../schemas/hotelRoom";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion:"2023-08-16",
});

type RequestData = {
    checkInDate:string;
    checkOutDate:string;
    adults:string;
    children:number;
    numberOfDays:number;
    hotelRoomSlug:string;
}

export async function POST(req:Request,res:Response) {
    const {checkInDate,checkOutDate,adults,children,numberOfDays,hotelRoomSlug}:RequestData = await req.json();

    if(
        !checkInDate|| 
        !checkOutDate || 
        !adults || 
        !hotelRoomSlug || 
        !numberOfDays
    ){
        return new NextResponse("Please all fields are required",{status:400})
    }

    const origin = req.headers.get('origin')

    const session = await getServerSession(authOptions)

    if(!session){
        return new NextResponse("Authentication required",{status:400})
    }

    const userId = session.user.id
    const formattedCheckOutDate = checkOutDate.split('T')[0]
    const formattedCheckInDate = checkInDate.split('T')[0]

    try{
        const room = await getRoom(hotelRoomSlug);
        const discountPrice = room.price - (room.price / 100) * room.discount;
        const totalPrice = discountPrice + numberOfDays


        //Create a Stripe payment
        const stripeSession = await stripe.checkout.sessions.create({
            mode:"payment",
            line_items:[
                {
                    quantity:1,
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name:room.name,
                            images:room.images.map(image => image.url)
                        },
                        unit_amount:parseInt((totalPrice * 100).toString())
                    }
                }
            ],
            payment_method_types:['card'],
            success_url:`${origin}/users/${userId}`
        })
        return  NextResponse.json(stripeSession,{status:200,statusText:"Payment session is created"})
    }catch(error:any){
        console.log(error);
        return new NextResponse("Payment failed",{status:500},)
        
    }
}