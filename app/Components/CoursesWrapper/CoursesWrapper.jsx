import React from 'react'
import style from './CoursesWrapper.module.scss'
import Card from '../Card/Card'
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/util/auth';

async function CoursesWrapper({catid}) {
  const session = await getAuthSession()
  const getData=async(catid)=>{
    try {
          const res= await fetch(`full-stack-e-learing-platform-with-tarek.vercel.app/api/course?catid=${catid || ""}&userEmail=${session.user.email}`,{method:"GET",cache:"no-store"})
          // if(!res.ok){
          //   throw new Error("Couldn't connect to server")
          // }
        const data = await res.json()
        return data
      } catch (error) {
        console.log("errrr",error)
    }  
  }
  const data=await getData(catid);
 
  // const newData = data.map(item => ({
  //   ...item,
  //   rating: item.couments.find(item2 => item2.courseId === item.id)?.rating || null
  // }));
  
if(data){
  return (
    <div className={style.container}>
        {data.map(item=><Card key={item.id} item={item}/>)} 
    </div>
  )
}
}

export default CoursesWrapper
