import React from 'react'
import style from './DashBordHead.module.scss'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function DashBordHead({data}) {
  
  let totalCompluteCourse=0;
  let totalProgrsCourse=0;
  data.map(item=>{
      if(item.progression.length===item.chapters.length){
          totalCompluteCourse++
      }else{
        totalProgrsCourse++
      }

    })
 
  return (
    <div className={style.head}> 
        <div className={style.left}>
          <div className={style.icon}>
            <AccessTimeIcon fontSize='inherit'/>
          </div>
          <div className={style.text}>
            <span className={style.boldText}>
              In Progress
              </span>
            <span className={style.grayTxt}>
                {totalProgrsCourse} Courses
            </span>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.icon}>
            <TaskAltIcon fontSize='inherit'/>
          </div>
          <div className={style.text}>
            <span className={style.boldText}>
              Completed
            </span>
            <span className={style.grayTxt}>
              {totalCompluteCourse} Courses
            </span>
          </div>
        </div>
      </div>
  )
}

export default DashBordHead