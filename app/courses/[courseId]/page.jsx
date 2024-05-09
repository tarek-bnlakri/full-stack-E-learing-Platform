import React from 'react'
import style from './course.module.scss'
import SideBar from '@/app/Components/SideBar/SideBar';
import ChapterCountent from '@/app/Components/ChapterCountent/ChapterCountent';
import { getAuthSession } from '@/util/auth';
import OverviewCourse from '@/app/Components/OverviewCourse/OverviewCourse';
import { Suspense } from 'react'
import Loading from './loading';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
async function SingleCourse({params,searchParams}) {
  const session=await getAuthSession()
  if(!session){
    redirect('/')
  }
  const getData=async(courseId,session)=>{
    const res= await fetch(`${process.env.DOMAIN}/api/course/${courseId}?userEmail=${session.user.email}`)
    const data= await res.json();
    const {chapters,progression}=data
    
      
     let items=chapters.map(item=>({
      id:item.id,
      name:item.chapterName,
      path:`?chapterName=${item.id}`,
    
    }))
    items=items.map(item=>{
      const isCompluted=progression.some(obj=>obj.chapterNameRef===item.id)
      return {...item, isCompluted}
    })
     
    return {items,data}
  }
  const {chapterName}=searchParams
  const {courseId}=params;
  
  const {items,data}=await getData(courseId,session)
    
  return (
    <div className={style.course}>
      <div className={style.exit}><Link href={`/courses`} ><LogoutIcon/>Exit</Link></div>
       <SideBar  session={session}  items={items}/>
       {chapterName?<Suspense fallback={<Loading/>} key={chapterName}><ChapterCountent title={data.title} chapterName={chapterName}  courseId={courseId}/></Suspense>:<OverviewCourse data={data}/>}
    </div>
  )
}

export default SingleCourse
