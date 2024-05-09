import React from 'react'
import { Suspense } from 'react'
import AuthCatigory from '../Components/AuthCatigory/AuthCatigory'
import CoursesWrapper from '../Components/CoursesWrapper/CoursesWrapper'
import Loading from './loading'
import style from './Course.module.scss'
import { getAuthSession } from '@/util/auth'
import { redirect } from 'next/navigation'
async function Courses({searchParams}) {
    const {catid}=searchParams
    const sesion= await getAuthSession()
    if(!sesion ){
      redirect('/')
    }
  return (
    <div className={style.container}>
        <AuthCatigory catid={catid}/> 
        <Suspense key={catid} fallback={<Loading/>}>
          <CoursesWrapper catid={catid} />
        </Suspense>
    </div>
  )
}

export default Courses