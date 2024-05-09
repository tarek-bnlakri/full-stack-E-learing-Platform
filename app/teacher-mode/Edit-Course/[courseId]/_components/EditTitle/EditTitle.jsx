'use client'
import React,{useState,useEffect} from 'react'
import style from './EditTitle.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch } from 'react-redux';
import { setTitle } from '@/reduxe/reducers/NewCourseReducer';
import toast from 'react-hot-toast';

function EditTitle({course}) {
  const dispatch= useDispatch()
 
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [laoding, setlaoding] = useState(false)
  const [changed, setChanged] = useState(false)
  useEffect(() => {
    
  setValue(course.title)
    
  }, [course])
  const updateTitle=async()=>{
    setlaoding(true)
    const res=await fetch(`http://localhost:3000/api/course/${course.id}`,{method:'PUT',body:JSON.stringify({
      id:course.id,
      title:value
    })})
    if(res.ok){
    
      toast.success("Title Updated")
      setlaoding(false)
      setChanged(false)
      dispatch(setTitle())
      setOpen(false)
    }
      else{
        toast.error("Could't updet Title")
        setlaoding(false)
      }
  }
  return (
    <div className={style.editTitle}>
        <div className={style.head}>
            <div className={style.left}>
              Course Title
            </div>
            
            <div onClick={()=>setOpen(!open)} className={style.right}>
                 <EditOutlinedIcon /> Edit Title
            </div>
        </div>
          {!open?<p>{value}</p>:<><TextField sx={{backgroundColor:"white"}} value={value} onChange={(e)=>{setValue(e.target.value);setChanged(true)}} className={style.input} label="Chouse title" variant="outlined"/>
          <Button onClick={updateTitle} sx={{width:"max-content"}} disabled={!changed||laoding} variant="contained">Contained</Button>
          </>}
    </div>
  )
}

export default EditTitle