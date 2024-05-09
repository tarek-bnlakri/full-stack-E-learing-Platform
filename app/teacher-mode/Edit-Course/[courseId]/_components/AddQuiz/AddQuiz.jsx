'use client'
import React,{useState,useEffect} from 'react'
import style from './AddQuiz.module.scss'
import TextField from '@mui/material/TextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
function AddQuiz({chapter}) {
    console.log(chapter)
  const [open, setOpen] = useState(false)
  const [question,setQuestion]=useState([])
  const [change,setChange]=useState(false)
  const reset={
    id:"",
    chapter:"",
    question:"",
    options:[],
    answer:""
  }
  const [value, setValue] = useState({
    id:"",
    chapter:"",
    question:"",
    options:[],
    answer:""
  })
  console.log(value)
  const [loading, setLoading] = useState(false)
  const router=useRouter()
 
  const handleClick=async()=>{
      if(!value.question||!value.options||!value.answer){
        return toast.error("All fields are required")
      }
      setLoading(true)
      const res= await fetch(`/api/quiz`,{method:"POST",body:JSON.stringify({
        value:{...value,id:chapter.id}
      })})
      if(res.ok){
        const data= await res.json()
        router.refresh()
        setLoading(false)
        toast.success("Question aded  ")
        setOpen(false)
      }else{
        toast.error("could't add Question")
        setLoading(false)
        console.log(res)
      }
      
  }
  const deleteQestion=async(id)=>{
      const res=await fetch(`/api/quiz?id=${id}`,{method:"DELETE"})
      if(res.ok){
        toast.success("Question deleted")
        router.refresh()
      }else{
        toast.error("the Question was not delete")
      }
  }
  const updateQuestion=async()=>{
    console.log(value)
    if(!value){
        return toast.error("All fields are required")
      }
      setLoading(true)
      const res= await fetch(`/api/quiz`,{method:"PUT",body:JSON.stringify({
        value
      })})
      if(res.ok){
        const data= await res.json()
        router.refresh()
        setLoading(false)
        toast.success("Question Updated  ")
        setOpen(false)
      }else{
        toast.error("could't Update Question")
        setLoading(false)
        console.log(res)
      }

  }

  useEffect(()=>{
    setChange(false)
  },[open])
  return (
    <div className={style.editTitle}>
        <div className={style.head}>
            <div className={style.left}>
              Quiz chapter
            </div>
            
            <div onClick={()=>{setOpen(!open);setValue(reset)}} className={style.right}>
                 <ControlPointOutlinedIcon /> Add a Quiz
            </div>
        </div>
          {!open?<p style={{color:"grey"}}><i>{!chapter.quiz?"No Quiz":""}</i></p>:<>
          <TextField sx={{backgroundColor:"white"}} value={value.question} onChange={(e)=>{setValue((prev)=>({...prev,question:e.target.value}));setChange(true)}} className={style.input} label="Qesution" variant="outlined"/>

          <TextField sx={{backgroundColor:"white"}} value={value.options} onChange={(e)=>{setValue((prev)=>({...prev,options:e.target.value}));setChange(true)}} className={style.input} placeholder='separate your options with  comma' label="Options" variant="outlined"/>

          <TextField placeholder='write option number exp 1 or 2 ...' sx={{backgroundColor:"white"}} value={value.answer} onChange={(e)=>{setValue((prev)=>({...prev,answer:e.target.value}));setChange(true)}} className={style.input} label="Answuer" variant="outlined"/>

          { !value.id?<LoadingButton disabled={!change} sx={{width:"max-content"}}  size="small" onClick={handleClick} loading={loading} variant="contained">
          <span>Save</span>
          </LoadingButton>:<LoadingButton disabled={!change} sx={{width:"max-content"}}  size="small" onClick={updateQuestion} loading={loading} variant="contained">
          <span>Update</span>
          </LoadingButton>}
         
          </>}
          {chapter&&chapter.quiz.map(item=><div key={item.id} className={style.link} >
            <div className={style.left}><DragIndicatorIcon/><span>{item.question}</span></div>
            <div className={style.right}>
              <IconButton onClick={() => deleteQestion(item.id)} aria-label="delete">
                <DeleteIcon sx={{color:"#f5554a"}} />
            </IconButton >

            <span style={{ cursor: "pointer"}} onClick={()=>{setValue(item);setOpen(!open)}}><EditOutlinedIcon/></span>
            </div>
            </div>)}
      </div>
  )
}

export default AddQuiz
