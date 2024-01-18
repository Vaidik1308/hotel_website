'use client'
import ThemeContext from '@/context/themeContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'

type Props = {}

const Header = (props: Props) => {
    const {setDarkTheme,darkTheme} = useContext(ThemeContext)
    const {data:session} = useSession()
  return (
    <header className='py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between'>
        <div className='flex items-center w-full md:2/3'>
            <Link href={"/"} className='font-black text-tertiary-dark'>
                Hotelzz
            </Link>
            <ul className="flex items-center ml-5">
                <li className='flex items-center'>
                    {
                        session?.user ? (
                            <Link href={`/users/${session.user.id}`}>
                                {session.user.image ? (
                                    <div className='relative h-[30px] w-[30px]'>
                                        <Image alt='profile_pic' src={session.user.image} fill className='object-cover rounded-full'/>
                                    </div>
                                ) : (
                                    <FaUserCircle className='cursor-pointer' />
                                )}
                            </Link>
                        ) : (
                            <Link href={"/auth"}>
                                <FaUserCircle className='cursor-pointer' />
                            </Link>
                        )
                    }
                </li >
                <li className="ml-2">
                    {
                        darkTheme ? (
                            <MdOutlineLightMode onClick={() => {
                                setDarkTheme(false)
                                localStorage.removeItem("hotel-theme")
                            }} className='cursor-pointer' />
                        ) : (
                            <MdDarkMode onClick={() => {
                                setDarkTheme(true)
                                localStorage.setItem("hotel-theme","true")
                            }} className='cursor-pointer' />
                        )
                    }
                </li>
            </ul>
        </div>

        <ul className='flex items-center justify-between w-full md:w-1/3 mt-4'>
            <li className='hover:-translate-y-2 duration-500 transition-all'>
                <Link href={"/"}>Home</Link>
            </li>
            <li className='hover:-translate-y-2 duration-500 transition-all'>
                <Link href={"/rooms"}>Rooms</Link>
            </li>
            <li className='hover:-translate-y-2 duration-500 transition-all'>
                <Link href={"/contact"}>Contact</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header