import dynamic from 'next/dynamic';
import React from 'react'
import EditCourseComp from './_components/EditCourseComp/EditCourseComp'
import style from './editCourse.module.scss'
// import EditChapter from './_components/EditChapter/EditChapter'
import { getAuthSession } from '@/util/auth'
import { redirect } from 'next/navigation'
async function EditCourse({params,searchParams}) {
  const EditChapter = dynamic(() => import("./_components/EditChapter/EditChapter"), { ssr: false });
  const session = await getAuthSession();
    if(!session){
      redirect('/')
    }
  const {courseId}=params
  const {editChapter}=searchParams
  
  const getCourse=async()=>{
    const res= await fetch(`http://localhost:3000/api/course/${courseId}`,{cache:"no-store"})
    if(res.ok){
      const course= await res.json()
      return course
    }
    else{
      throw new Error('Could not find course')
    }
  }
   const course= await getCourse()
 
  return (
  
    
      <div className={style.countainer}>
         {editChapter?<EditChapter course={course} editChapter={editChapter}/>:<EditCourseComp course={course}/>}
      </div>
    
    
  
    
  )
}

export default EditCourse