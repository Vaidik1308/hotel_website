'use client'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react'

type Props = {
    roomTypeFilter:string,
    searchQuery:string,
    setRoomTypeFilter:(value:string)  => void;
    setSearchQuery: (value:string) => void
}

const Search = (
    {
        roomTypeFilter,
        searchQuery,
        setRoomTypeFilter,
        setSearchQuery
    }: Props) => {

        const router = useRouter()

        const handleRoomTypeChange = (event:ChangeEvent<HTMLSelectElement>) => {
            setRoomTypeFilter(event.target.value)
        }

        const handleSearchQueryChange = (event:ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value)
        }

        const handleFilterClick = () => {
            //navigate to the room page with query
            router.push(`/rrom?rromType=${roomTypeFilter}&searchQuery=${searchQuery}`)
        }
  return (
    <section className='bg-tertiary-light px-4 py-6 rounded-lg'>
        <div className='container mx-auto flex gap-4 flex-wrap justify-between items-center'>
            <div className='w-full md:w-1/3 lg:w-auto mb-4 md:mb-0'>
                <label className='block text-sm font-medium mb-2 text-black'>Room Type</label>
                <div className='relative'>
                    <select 
                        className='w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none' 
                        name="" 
                        value={roomTypeFilter}
                        onChange={handleRoomTypeChange}
                        id=""
                    >
                        <option value="All">All</option>
                        <option value="Basic">Basic</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Suite">Suite</option>
                    </select>
                </div>
            </div>
            <div className='w-full md:w-1/3 lg:w-auto mb-4 md:mb-0 '>
                <label htmlFor="" className='block text-sm font-medium mb-2 text-black'>Search</label>
                <input 
                    type="text" 
                    placeholder='Search...'  
                    name="search" 
                    id="search" 
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    className='w-full px-4 py-2.5 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white ' 
                />
            </div>

            <button 
                className='btn-primary'
                type='button'
                onClick={handleFilterClick}
            >
                    Search
            </button>
        </div>
        
    </section>
  )
}

export default Search