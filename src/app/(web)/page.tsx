import FeaturedRoom from '@/components/FeaturedRoom/FeaturedRoom'
import Gallery from '@/components/Gallery/Gallery'
import HeroSection from '@/components/HeroSection/HeroSection'
import NewsLetter from '@/components/NewsLetter/NewsLetter'
import PageSearch from '@/components/PageSearch/PageSearch'
import { getFeaturedRoom } from '@/libs/apis'
import Image from 'next/image'
import wait from 'wait'

 const Home = async () => {

  const featuredRoom = await getFeaturedRoom()
  // console.log(featuredRoom);
   
  // await wait(2000)
  // throw new Error("unable to load")
  return (

    <>
      <HeroSection/>

      {/* Page Search */}
      <PageSearch/>

      {/* Featured Room */}
      <FeaturedRoom featuredRoom={featuredRoom}/>

      {/* Gallery */}
      <Gallery/>

      {/* News Letter */}
      <NewsLetter/>
      
    </>
  )
}

export default Home
