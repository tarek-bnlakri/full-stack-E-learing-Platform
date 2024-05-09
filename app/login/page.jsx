'use client'
import React from 'react'
import style from './login.module.scss'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
function LogIn() {
    const router=useRouter()
    const{data,status}=useSession()
    console.log(data)
    if(status === 'loading')
        return <div>loading....</div>
    if(status ==='authenticated')
        router.push('/courses')
  return (
    <div className={style.containerLogin}>
        <div onClick={()=>signIn("google")} className={style.box}>
            <span className={style.icon}><img src="/google.png" alt="" /></span>
            <span  className={style.text}>continue with Google</span>

        </div>
        
    </div>
  )
}

export default LogIn