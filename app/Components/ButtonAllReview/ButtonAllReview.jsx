'use client'
import React,{useState} from 'react'
import style from './ButtonAllReview.module.scss'
import Comment from '../Comment/Comment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setOpen } from '@/reduxe/reducers/CommentCompReducer';
function ButtonAllReview({data}) {
    
    const open = useSelector(state => state.comment.open);
    const dispatch=useDispatch()
  return (
    <div className={style.ButtonContainer}>
        <button onClick={()=>dispatch(setOpen(true))}>Show all reviews</button>
        {open &&<Comment data={data}/>}
    </div>
  )
}

export default ButtonAllReview