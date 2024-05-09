import React from 'react'
import style from './CustomizeCourse.module.scss'
import EditTitle from '../EditTitle/EditTitle'
import EditDescription from '../EditDescription/EditDescription'
import UploadePhoto from '../UploadePhoto/UploadePhoto'
import EditCatigory from '../EditCatigory/EditCatigory'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EditLernerOption from '../EditLernerOption/EditLernerOption'
function CustomizeCourse({course}) {
  return (
    <div className={style.CustomizeCourse}>
      
      <div className={style.head}>
          <h3><DashboardOutlinedIcon/>Customize Your Course</h3> 
      </div>

      <EditTitle course={course}/>
      <EditDescription course={course}/>
      <UploadePhoto course={course}/>
      <EditCatigory course={course}/>
      <EditLernerOption course={course}/>
    </div> 
  )
}

export default CustomizeCourse