'use client'
import React,{useState} from 'react'

import CourseCountent from '../ChapterCountent/ChapterCountent'
import style from './ClientSingleCourse.module.scss'
import ChapterSideBar from '../ChapterSideBar/ChapterSideBar'
import SideBar from '../SideBar/SideBar'
function ClientSingleCourse({items,chapters}) {
    const [title, settitle] = useState('')
  return (
    <div>
        <ChapterSideBar title={title} settitle={settitle} items={items}/>
        <CourseCountent chapters={chapters} title={title}/>
    </div>
  )
}

export default ClientSingleCourse