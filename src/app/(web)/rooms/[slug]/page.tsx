'use client'
import HotelPhotoGallery from '@/components/HotelPhotoGallery/HotelPhotoGallery';
import LoadSpinner from '@/components/LoadSpinner/LoadSpinner';
import { getRoom } from '@/libs/apis';
import React from 'react'
import useSWR from 'swr';

type Props = {}

const RoomDetails = ({params}:{params:{slug:string}}) => {
    const slug = params.slug 
    const fetchRoom = async () => getRoom(slug);

    const { data: room, error, isLoading } = useSWR('/api/room', fetchRoom);
    if(error) throw new Error("Cannot fetch data")
    if(typeof room === 'undefined' && !isLoading) throw new Error("Cannot fetch data")
    if(!room) return <LoadSpinner/>
    // console.log(room);
    
    
  return (

    <div>
        <HotelPhotoGallery photos={room.images} />
    </div>
  )
}

export default RoomDetails