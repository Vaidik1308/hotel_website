'use client'
import RoomCard from '@/components/RoomCard/RoomCard'
import Search from '@/components/Search/Search'
import { getRooms } from '@/libs/apis'
import { Room } from '@/models/rooms'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

type Props = {}

const Rooms = (props: Props) => {
    const [roomTypeFilter,setRoomTypeFilter] = useState("")
    const [searchQuery,setSearchQuery] = useState("")
    const searchParams = useSearchParams()

    useEffect(() => {
        const searchQuery = searchParams.get("searchQuery")
        const roomType = searchParams.get("roomType")

        if(roomType) setRoomTypeFilter(roomType)
        if(searchQuery) setSearchQuery(searchQuery)
        
        
    },[searchParams])


    async function fetchData(){
      return getRooms()
    }

    
    const {data,error,isLoading} = useSWR('get/hotelRooms',fetchData)
    if(error) throw new Error("Cannot fetch data")
    if(typeof data === 'undefined' && !isLoading) throw new Error("Cannot fetch data")

  const filterRooms = (rooms:Room[]) => {
    return rooms.filter(room => {
      if(
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ){
        return false
      }


      if(
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ){
        return false
      }

      return true
    })
  }

  const filteredRooms:Room[] = filterRooms(data || [])
  
  
    
  return (
    <div className='container mx-auto pt-10'>
      <Search 
        setSearchQuery={setSearchQuery} 
        setRoomTypeFilter={setRoomTypeFilter} 
        roomTypeFilter={roomTypeFilter} 
        searchQuery={searchQuery} 
      />
      <div className='flex flex-wrap justify-between mt-20 mx-auto container px-4 gap-5'>
        {
          filteredRooms.map(room => (
            <>
              <RoomCard key={room._id} room={room} />
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Rooms