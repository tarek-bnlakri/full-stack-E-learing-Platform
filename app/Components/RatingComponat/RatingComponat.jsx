'use client'
import React from 'react'
import { Rating } from '@mui/material';
import style from './RatingComponat.module.scss'




 async function RatingComponat({rating,ratingRedux}) {
 
 

  return (

        <div className={style.barRating}>
            <Rating value={rating}  name="read-only" readOnly/>
        </div>
  )
}

export default RatingComponat