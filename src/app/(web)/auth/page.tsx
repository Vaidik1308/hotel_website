'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {signUp} from 'next-auth-sanity/client'
import { signIn,useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {}

const defaultFormData = {
    email:"",
    name:"",
    password:""
}

const Auth = (props: Props) => {

    const [formData,setFormData] = useState<typeof defaultFormData>(defaultFormData)

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        // console.log(name,value);
        
        setFormData({...formData,[name]:value})
    }

    const {data:session} = useSession()

    const router = useRouter()
    // console.log(session);
    useEffect(() => {
        if(!session){
            router.push("/")
        }
    },[router,session])


    
    const loginHandler = async () => {
        try{
            await signIn();
            // push the user to the home page
            router.push('/')
        } catch(error){
            console.log(error);
            toast.error("Something went wrong")
            
        }
    }

    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault()

        try {
            // console.log(formData);
            const user = await signUp(formData)
            if(user) {
                toast.success("Success. Please sign in")
            }
            
        } catch (error) {
            console.log(error);
            toast.error("error in signing up")
        } finally{  
            setFormData(defaultFormData )
        }
    }



    const inputStyle = 'border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none '
  return (
    <section className='container mx-auto'>
        <div className='p-6 space-y-4 md:space-y-8 w=80 md:w-[70%] mx-auto'>
            <div className='flex mb-8 flex-col md:flex-row items-center justify-between'>
                <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>Create an Account</h1>
                <p>OR</p>
                <span className='inline-flex items-center'>
                    <AiFillGithub  
                        onClick={() => signIn('github')}
                        className='mr-3 text-4xl cursor-pointer text-black dark:text-white' 
                    /> 
                    |
                    <FcGoogle 
                        className='ml-3 text-4xl cursor-pointer text-black dark:text-white'
                        onClick={() => signIn('google')}
                    />
                </span>
            </div>

            <form action="" onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                <input 
                    type="email"
                    name="email" 
                    placeholder='abc@gmail.com'
                    required
                    className={`${inputStyle}`} 
                    id="email"
                    value={formData.email} 
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    name="password" 
                    placeholder='password'
                    required
                    minLength={6}
                    className={`${inputStyle}`} 
                    id="" 
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    placeholder='vaidik singh'
                    required
                    className={`${inputStyle}`} 
                    name="name" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <button className='w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center' type='submit'>
                    Sign Up
                </button>
            </form>

            <button onClick={loginHandler} className='text-blue-700'>Login</button>

        </div>
    </section>
  )
}

export default Auth