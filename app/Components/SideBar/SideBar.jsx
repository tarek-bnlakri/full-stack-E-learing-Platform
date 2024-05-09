'use client'
import React,{useState,useEffect} from 'react'
import style from './SideBar.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { usePathname,useSearchParams } from 'next/navigation'
import Link from 'next/link';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useSelector } from 'react-redux';

function SideBar({items,session}) {
 
  
  const [myprogression, setProgression] = useState([])
  
  
  const searchParams = useSearchParams()
  const chapterNameQuery = searchParams.get('chapterName')
  console.log(chapterNameQuery)
    const [sideBar, setSideBar] = useState(false)
    const display = useSelector(state => state.sideBar.display);
   
  return (
    <>
    {display &&(

      <div style={{transform:`${sideBar?"translateX(198px)":""}`}}   className={style.SideBar}>
    
          <span  onMouseEnter={()=>setSideBar(!sideBar)}  onClick={()=>setSideBar(!sideBar)}> 
           <ArrowForwardIosIcon color='#8e44ad' fontSize='large'/>
          </span>
          {items.map(item=><Link href={item.path} className={chapterNameQuery===`${item.id}`?style.active:
           item.isCompluted?style.complete:style.item} key={item.id} >{item.name} {item.isCompluted&&<TaskAltIcon/>}</Link>)
          }
        
    </div>
    )}
    </>
  )
}

export default SideBar