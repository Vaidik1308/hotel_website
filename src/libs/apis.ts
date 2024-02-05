import { CreateBookingDto, Room } from "@/models/rooms";
import sanityClient from "./sanity";
import * as queries from './sanityQueries'
import axios from "axios";

export async function getFeaturedRoom() {
    const result = await sanityClient.fetch<Room>(
      queries.getFeaturedRoomQuery,
      {},
      { cache: 'no-cache' }
    );
  
    return result;
  }

  export async function getRooms(){
    const results = await sanityClient.fetch<Room[]>(queries.getRoomsQuery,{ cache: 'no-cache' })
    return results
  }


  export async function getRoom(slug: string) {
    const result = await sanityClient.fetch<Room>(
      queries.getRoom,
      { slug },
      { cache: 'no-cache' }
    );
  
    return result;
  }

  export const createBooking = async ({
    adults,
    checkInDate,
    checkOutDate,
    children,
    discount,
    hotelRoom,
    totalPrice,
    numberOfDays,
    user
  }: CreateBookingDto ) => {
    const mutation = {
      mutations:[
        {
          create: {
            _type:"booking",
            user:{_type:"reference", _ref:user},
            hotelRoom: { _type:"reference", _ref: hotelRoom},
            checkInDate,
            checkOutDate,
            numberOfDays,
            adults,
            children,
            totalPrice,
            discount,
          }
        }
      ]
    }
    const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,mutation,{
      headers:{Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`}
    })
    return data
  }