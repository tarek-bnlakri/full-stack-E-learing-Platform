'use client'
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import style from './NewComment.module.scss'
import { setOpen,setCoursId,setRating } from '@/reduxe/reducers/NewCommentsReducer'
import { Rating } from '@mui/material'
import Loading from './Loading'
import {setCourseIdRedux,setRatingRedux} from '@/reduxe/reducers/RatingReducer'
import { useRouter } from 'next/navigation'
function NewComment({courseId}) {
  const router= useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [value, setValue] = useState(0)
  const [text, setText] = useState('')
  useEffect(() => {
   const getData=async()=>{
    setLoading(true)
    const res =await fetch(`http://localhost:3000/api/Comments?courseId=${courseId}`)
      if(res.ok){
          const data=await res.json()
      
          if(data){
            setData(data)
            setValue(data.rating)
            setText(data.userText)
          }
          
          setLoading(false)
          console.log(data)
      }
      
   }
   courseId&&getData()
  }, [courseId])

  const handleClose=()=>{
    dispatch(setCoursId(''))
    dispatch(setOpen(false))
  }
  const addNewComment =async()=>{
      try {
        dispatch(setRating(value))
        setLoading(true)
        const res=await fetch(`http://localhost:3000/api/Comments`,{method:'POST' ,body:JSON.stringify({
          userText:text,
          rating:value,
          courseId
       })})
       if(!res.ok){
         throw new Error("Couldn't add comment")
       }
       setLoading(false)
       dispatch(setOpen(false))
       router.refrech()
      
    
      } catch (error) {
        console.log(error);
      }
    }
    const update=async()=>{
      try {
        dispatch(setRating(value))
        setLoading(true)
        const res=await fetch(`http://localhost:3000/api/Comments`,{method:'PUT' ,body:JSON.stringify({
          userText:text,
          rating:value,
          id:data.id
       })})
       if(!res.ok){
         throw new Error("Couldn't add comment")
       }
       setLoading(false)
       dispatch(setOpen(false))
       router.refrech()
     
    
      } catch (error) {
        console.log(error);
      }
    }
       
   
    const dispatch=useDispatch();
  
    const [back, setBack] = useState(false)
   
if(courseId){

  return (
    <div  className={style.NewComment}>
        
          <span onClick={handleClose} className={style.black}></span>
       
        <div className={style.wrraper}>
        {loading?<Loading/>:(<> 
            <h1>How would you rate this course?</h1>
            <span  className={style.ratingBar}><Rating  sx={{
                fontSize: '50px',
            
            }} name="simple-controlled" value={value} onChange={(event, newValue)=>{setValue(newValue);}}/>
            </span>
            {(value>0||data)&&<div className={style.comment}>
                    <div onClick={()=>setValue(0)} className={style.Back}>Back</div>
                <textarea value={text} onChange={(e)=>setText(e.target.value)} 
                  placeholder='Tell us about your personal experience taking this course'/>
                  {data?<button onClick={update}>Update</button>:<button onClick={addNewComment}>Save and Continue</button>}
                </div>
              }
               </>)}
        </div>
       
      
    </div>
  )
}
}

export default NewComment