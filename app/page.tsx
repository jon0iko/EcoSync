import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (

    <div className='w-screen h-screen bg-black flex justify-center items-center text-white'>
      <div className='w-full max-w-[600px] mx-auto'>
        <h1 className='text-6xl mb-4'>EcoSync</h1>
        <p className='text-2xl text-white/60 mb-4'>Revolutionizing Waste Management in Dhaka North City Corporation</p>
        <div>
          <Link href='/users'>
          <button className='bg-red-500 px-4 py-2 rounded-lg text-xl'>SignUp</button>
          </Link>
        </div>
      </div>
    </div>
      
  )
}