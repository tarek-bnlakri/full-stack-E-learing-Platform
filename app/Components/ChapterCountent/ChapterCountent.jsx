import React from 'react'
import style from './CourseCountent.module.scss'
import ButtonIsCompleted from './_Components/ButtonIsCompleted'
// import ButtonNotCopleted from './_Components/ButtonNotCopleted'
import { getAuthSession } from '@/util/auth'
import Link from 'next/link'
import WrapQuiz from './_Components/WrapQuiz'
import HTMLReactParser from 'html-react-parser'
import dynamic from 'next/dynamic';
const getData=async(chapterName,session)=>{
     
  const res= await fetch(`http://localhost:3000/api/chapter/?chapterName=${chapterName || ''}&userEmail=${session.user.email || ''}`,{cache:"no-store"})
  if(!res.ok){
      throw new Error('invalide search')
  }
  const data =await res.json()
  return data
}
 async function ChapterCountent({chapterName,courseId,title}) {  
  const ButtonNotCopleted = dynamic(() => import("./_Components/ButtonNotCopleted"), { ssr: false });
  const session =await getAuthSession()
  const data = await getData(chapterName,session)
      let quiz=[]   
    if(data){
      quiz=data.quiz
    }
  console.log(quiz)
 if(chapterName){
 
  return (
      <div className={style.CourseContent}>
        <div className={style.head}>
        <Link href={`/courses/${courseId}`}>{title} </Link>
        {data.progressions?.length>0?<div><ButtonIsCompleted /></div>:<ButtonNotCopleted chapterName={chapterName} courseId={courseId}/>}
        </div>
          <div>

            <p className={style.title}><i>{data.chapterName}</i></p>
            {/* <div className={style.countent}  dangerouslySetInnerHTML={{__html:data.content}}/> */}
            <div className={style.countent}>
              {HTMLReactParser(data.content)}
            </div>
           
            {quiz.length>0&&<div className={style.buttonCountainer}>
                <WrapQuiz  quiz={quiz}/>
            </div>}
            
          </div>
           
        </div>
       
 
        )
      }
}

export default ChapterCountent