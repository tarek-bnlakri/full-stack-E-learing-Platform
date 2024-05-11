import React from 'react'
import style from './BoxComment.module.scss'
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import StarOutlineTwoToneIcon from '@mui/icons-material/StarOutlineTwoTone';
import { Rating } from '@mui/material';
function BoxComment({item}) {
  console.log(item)
  return (
    <div  className={style.box}>
          <div className={style.head}>
                <img src={item.user.image} alt="" />
                <div className={style.right}>
                    <p className={style.name}>{item.user.name}</p>
                    <p className={style.ratingAndDateCont}>
                    <span className={style.raitingbr}>
                      <Rating value={item.rating} readOnly/>
                    </span>
                    <span className={style.date}>{new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                </div>
            </div>
            <div className={style.body}>
                 {item.userText}
            </div>
    </div>
  )
}

export default BoxComment
