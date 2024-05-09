'use client'
import React from 'react'
import style from './EditChapter.module.scss'
import HeadEditCourse from '../HeadEditCourse/HeadEditCourse'
import EditTitleChapter from '../EditTitleChapter/EditTitleChapter'
import EditContentChapter from '../EditContentChapter/EditContentChapter'
import UploadePhoto from '../UploadePhoto/UploadePhoto'
import AddQuiz from '../AddQuiz/AddQuiz'
import Jodit from '../Jodit/Jodit'
import HeadEditChapter from '../HeadEditChapter/HeadEditChapter'
function EditChapter({course,editChapter}) {
    const {chapters}=course
    const findChapterById = (chapters, editChapter) => {
        return chapters.find(chapter => chapter.id === editChapter);
    };
    const chapter=findChapterById(chapters,editChapter)
    console.log(chapter)
  return (
    <div className={style.countainer}>
      {/* <HeadEditCourse name={"Chapter"} chapter={chapter} course={course}/> */}
      <HeadEditChapter chapter={chapter} course={course}/>
      <div className={style.body}>
            <div className={style.up}>
                <EditTitleChapter chapter={chapter}  />
                <UploadePhoto chapter={chapter}/>
                  <AddQuiz chapter={chapter}/>
            
            </div>
            <div className={style.down}>
                {/* <EditContentChapter chapter={chapter}/> */}
                <Jodit chapter={chapter}/>
            </div>
      </div>
    </div>
  )
}

export default EditChapter