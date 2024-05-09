import React from 'react'
import HeadEditCourse from '../HeadEditCourse/HeadEditCourse'
import CustomizeCourse from '../CustomizeCourse/CustomizeCourse'
import CustomizeChapters from '../CustomizeChapters/CustomizeChapters'
import style from './EditCourseComp.module.scss'

function EditCourseComp({course}) {
  
  return (
    <div className={style.countainer}>
      <HeadEditCourse name={"Course"} course={course}/>
      <div className={style.body}>
        <CustomizeCourse course={course} />
        <CustomizeChapters course={course} />
      </div>
    </div>
  )
}

export default EditCourseComp