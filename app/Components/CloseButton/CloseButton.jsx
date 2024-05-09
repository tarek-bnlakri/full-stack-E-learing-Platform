'use client'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setOpen } from '@/reduxe/reducers/CommentCompReducer';
import style from './CloseButton.module.scss'
function CloseButton() {
    const dispatch=useDispatch()
  return (
    <button onClick={()=>dispatch(setOpen(false))}>X</button>
  )
}

export default CloseButton