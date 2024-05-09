'use client'
import React,{useEffect,useState} from 'react'
import style from './ChapterSide.module.scss'
import { useDispatch } from 'react-redux';
import {setDisplay} from '../../../reduxe/reducers/SideBarReducer.js'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function ChapterSideBar({items,settitle,title}) {
  const [sideBar, setSideBar] = useState(false)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(setDisplay(false));
    },[] )
    
  return (
    <div style={{transform:`${sideBar?"translateX(198px)":""}`}}   className={style.SideBar}>
    
    <span  onMouseEnter={()=>setSideBar(!sideBar)}  onClick={()=>setSideBar(!sideBar)}> 
     <ArrowForwardIosIcon color='#8e44ad' fontSize='large'/>
    </span>
    {items.map(item=><div onClick={()=>settitle(item.name)} className={title=== `${item.name}`?style.active:style.item} key={item.id}>{item.name}</div>)}
  
</div>
  )
}

export default ChapterSideBar