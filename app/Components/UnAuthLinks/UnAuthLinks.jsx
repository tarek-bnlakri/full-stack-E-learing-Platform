'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './UnAuthLinks.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
function UnAuthLinks({data}) {
    const path=usePathname();
    const [menuMobile, setMenuMobile] = useState(false)
    console.log(path)
  return (
    <>
    <div className='linksUnAuth'>
        <Link  className={`${path==='/'?'active':''}`}  href={"/"}>
            <span>Home</span>
        </Link>
        <Link  href={"/#About"} className={`${path==='/#about'?'active':''}`}>
            <span className='link'>About</span>
        </Link>
        <Link href={"/#Services"} className={`${path==='/#about'?'active':''}`}>
            <span>Services</span>
        </Link>
        <Link className={`${path==='/#Category'?'active':''}`}   href={"/#Category"}>
            <span>Catigories</span>
        </Link>
        {/* <Link className={`${path==='/#contact'?'active':''}`} href={'/#contact'}>
            <span>Contact</span>
        </Link> */}
        {/* <Link className={`${path==='/#contact'?'active':''}`} href={'/#contact'}>
            <span>Reviews</span>
        </Link>           */}
    </div>
        <div onClick={()=>setMenuMobile(!menuMobile)} className='Burger'>
            <div className='iconUnAuth'><MenuIcon/></div>
        <div  style={{transform:`${menuMobile?"translateX(-100vw)":""}`,
       
    }} className='MenuMobile'>
         <Link  className={`${path==='/Home'?'active':''}`}  href={"/"}>
             <span>Home</span>
         </Link>
         <Link  href={"/#About"} className={`${path==='/About'?'active':''}`}>
             <span className='link'>About</span>
         </Link>
         <Link href={"/#Services"} className={`${path==='/#about'?'active':''}`}>
             <span>Services</span>
         </Link>
         <Link className={`${path==='/#Category'?'active':''}`}   href={"/#Category"}>
             <span>Courses</span>
         </Link>
     </div> 
        </div>
       
       
        <Link href={'/login'} className='buttonUnAuth'>
                <span>Join Now</span>
                <span><ArrowForwardIcon/></span>
        </Link>
    </>
  )
}

export default UnAuthLinks