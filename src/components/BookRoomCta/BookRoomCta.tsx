'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

type Props = {
    price:number;
    discount:number;
    specialNote:string;
    checkInDate:Date | null ;
    setCheckInDate: Dispatch<SetStateAction<Date | null>>
    checkOutDate:Date | null ;
    setCheckOutDate: Dispatch<SetStateAction<Date | null>>;
    calcMinCheckOutDate: () => Date | null;
    adults:number ;
    setAdults: Dispatch<SetStateAction<number>>;
    noOfChildren:number ;
    setNoOfChildren: Dispatch<SetStateAction<number>>;
    isBooked:boolean;
    handleBookNowClick : () => void
}

const BookRoomCta = ({
    price,
    discount,
    specialNote,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    calcMinCheckOutDate,
    adults,
    setAdults,
    noOfChildren,
    setNoOfChildren,
    isBooked,
    handleBookNowClick
}: Props) => {

    const discountPrice =  price - (discount * price)/100

    const calcNoOfDays = () => {
        if(!checkInDate || !checkOutDate) return 0;
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
        const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000))
        return noOfDays
    }

    
  return (
    <div className="px-7 py-6 ">
        <h3>
            <span className={`${discount ? "text-gray-400" : ""} font-bold text-xl`}>
                $ {price}
            </span>
            {' '}
            {discount ? (
                <span className="font-bold text-xl">| discount {discount}%. Now <span className="text-tertiary-dark"> $ {Math.round(discountPrice)}</span> </span>
            ) : ""}
        </h3>
        
        <div className="w-full border-b-2 border-b-secondary my-2"/>
        <h4 className="my-8">{specialNote}</h4>

        <div className="flex">
            <div className="w-1/2 pr-2">
                <label 
                    htmlFor="check-in-date"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-400"
                >   
                    Check In Date
                </label>
                <DatePicker 
                    showIcon
                    selected={checkInDate} 
                    dateFormat="dd/MM/yyyy"
                    onChange={date => setCheckInDate(date)}
                    minDate={new Date()}
                    id='check-in-date'
                    className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
                />
            </div>
            <div className="w-1/2 pl-2">
                <label 
                    htmlFor="check-out-date"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-400"
                >   
                    Check Out Date
                </label>
                <DatePicker 
                    showIcon
                    selected={checkOutDate} 
                    dateFormat="dd/MM/yyyy"
                    onChange={date => setCheckOutDate(date)}
                    minDate={calcMinCheckOutDate()}
                    disabled={!checkInDate}
                    id='check-out-date'
                    className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
                />
            </div>
        </div>

        <div className='flex mt-4'>
            <div className='w-1/2 pr-2'>
                <label htmlFor="adults" className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Adults
                </label>
                <input 
                    id='adults' 
                    type="number" 
                    value={adults} 
                    onChange={(e) => setAdults(+e.target.value)} 
                    min={1} 
                    max={5} 
                    className='w-full border border-gray-300 rounded-lg p-2.5'
                />
            </div>
            <div className='w-1/2 pl-2'>
                <label htmlFor="adults" className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                    Children
                </label>
                <input 
                    id='adults' 
                    type="number" 
                    value={noOfChildren} 
                    onChange={(e) => setNoOfChildren(+e.target.value)} 
                    min={0} 
                    max={3} 
                    className='w-full border border-gray-300 rounded-lg p-2.5'
                />
            </div>
        </div>

        {calcNoOfDays() > 0 ? (
            <p className='mt-3'>
                Total Price: $ {calcNoOfDays() * discountPrice}
            </p>
        ) : (
            <></>
        )} 
        <button 
            disabled={isBooked} 
            className='btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed'
            onClick={() => handleBookNowClick()}
        >
            {isBooked ? "Booked" : "Book Now"}
        </button>
    </div>
  )
}

export default BookRoomCta