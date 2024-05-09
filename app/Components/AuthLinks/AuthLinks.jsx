'use client'
import React,{useState} from 'react'
import {signOut} from 'next-auth/react'
import { usePathname } from 'next/navigation'
import style from './AuthLinks.module.scss'
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';

function AuthLinks({data}) {
    const [menu, setmenu] = useState(false)
    const path=usePathname();
        console.log(path)
    const IsignOut=()=>{
        setmenu(false)
        signOut()    
      }
  return (
    <>
        <div className={style.link}>
            {path==="/teacher-mode/create-course"&&<Link sx={{color:"black",fontWeight:"bold"}} href={'/courses'} underline="hover"><LogoutIcon fontSize='small'/>Exit</Link>}

            {path==="/teacher-mode"&&<Link sx={{color:"black",fontWeight:"bold"}} href={'/courses'} underline="hover"><LogoutIcon fontSize='small'/>Exit</Link>}

            {path==="/teacher-mode/Edit-Course/"&&<Link sx={{color:"black",fontWeight:"bold"}} href={'/courses'} underline="hover"><LogoutIcon fontSize='small'/>Exit</Link>}
           
            {path==="/"&&<Link sx={{color:"black",fontWeight:"bold"}} target="_blank" href={'/teacher-mode'} underline="hover">{"Teacher mode"}</Link>}
            {path==="/courses"&&<Link sx={{color:"black",fontWeight:"bold"}} target="_blank" href={'/teacher-mode'} underline="hover">{"Teacher mode"}</Link>}
            <span className='image' onClick={()=>setmenu(!menu)}> <img src={data.user.image}  alt=""/></span>
        </div>
        
        <div className={menu?"profile active":"profile"}>
            <img src={data?.user?.image} className="image" alt=""/>
            <h3 className="name">{data.user.email}</h3>
            <p className="role">studen</p>
            <a href={`/profile/${data.user.email}`} className="btn">view profile</a>
            <div className="flex-btn">
                <button onClick={IsignOut} className='delete-btn'>LogOut</button>
            </div>
        </div>
    </>
  )
}

export default AuthLinks