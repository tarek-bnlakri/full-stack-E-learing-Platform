'use client'
import React from 'react'
import style from './Comment.module.scss'
import CloseButton from '../CloseButton/CloseButton'
import BoxComment from '../BoxComment/BoxComment'
import Rating from '@mui/material/Rating';
function Comment({data}) {
  const [value, setValue] = React.useState(2);

  return (
    <div className={style.Comment}>
      <div className={style.wrapper}>
        <span className={style.CloseButton}><CloseButton/></span>
        {data.couments.map(item=> <BoxComment key={item.id} item={item}/>)}
  
        
      </div>
   
    </div>
  )
}

export default Comment