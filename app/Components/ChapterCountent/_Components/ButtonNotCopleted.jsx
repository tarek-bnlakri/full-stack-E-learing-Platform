'use client'
import Button from '@mui/material/Button';
import React,{useState,useEffect} from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ButtonIsCompleted from './ButtonIsCompleted';
const handlComplutedButon =async (chapterName,courseId,setCompleted)=>{
    setCompleted(true)
    try {
      const res =await fetch(`http://localhost:3000/api/prog`,{method:"POST",body:JSON.stringify({chapterName,courseId
      })})
    } catch (error) {
      console.log("from trycatch block ButtonIsCompluted",error)
    }
   
   
  }
 
  
function ButtonNotCopleted({chapterName,courseId}) {
    const [completed, setCompleted] = useState(false)
    useEffect(() => {
        setCompleted(false)
      }, [chapterName])
  return (
    <>
        {completed?<ButtonIsCompleted/>:
        <Button color="success" onClick={()=>handlComplutedButon(chapterName,courseId,setCompleted)} variant="contained">{completed?"compluted"+<TaskAltIcon/>:"Mark as compluted"}</Button>
        }
    </>
  )
}

export default ButtonNotCopleted