import React from 'react'
import './NavBar.scss'
import UnAuthLinks from '../UnAuthLinks/UnAuthLinks.jsx'
import AuthLinks from '../AuthLinks/AuthLinks.jsx'
import { getAuthSession } from '@/util/auth';
import Link from 'next/link';
import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
async function NavBar() {
noStore() 
  const data= await getAuthSession()
  console.log(data)
  return (
    <div  className='NavBar'>
        <div className='logo'><Link href={data?"/courses":"/"}>LEARN<Image unoptimized={true} width={170} height={170} src="/logoLearning.png" alt="" /></Link></div>
        <div className='right'>
          {data?<AuthLinks data={data}/>:<UnAuthLinks data={data}/>}
        </div>
    </div>
  )
}

export default NavBar
