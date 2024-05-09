import React from 'react'
import style from './CustomizeChapters.module.scss'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import AddChapter from '../AddChapter/AddChapter';
function CustomizeChapters({course}) {
  return (
    <div className={style.CustomizeChapters}>
      <div className={style.head}>
        <h3> <ChecklistOutlinedIcon/> Customize Your Chapters</h3>
        </div>
      <AddChapter course={course}/>
    </div>
  )
}

export default CustomizeChapters