import React from 'react'
import { ModeToggle } from './ToogleModes'
import { Input } from './ui/input'
import Categories from './Categories'
import Link from 'next/link'

const Navbar = () => {
  return (
    
        <nav className='flex justify-between items-center px-4 bg-[#eea679b0] py-2'>
            <div className='left flex items-center gap-x-2'>
                <img
                className='w-14 h-14 object-fill rounded-full border-2 border-black'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" />

                <p className='italic font-extrabold leading-[0.25rem] text-2xl'>
                    Shayarify
                </p>
            </div>
            <div className='right'>
                <ul className='flex justify-center items-center gap-x-4'>
                    <li><Link href="/">Home</Link></li>
                    <li><Categories /></li>
                    <li><Link href="/pages/reels">Reels</Link></li>
                    <li><Link href="/pages/submit-shayari">Submit Shayari</Link></li>
                    <li><ModeToggle /></li>
                    <li><Input type={"text"} placeholder='Search' /></li>
                </ul>
            </div>
        </nav>
    
  )
}

export default Navbar