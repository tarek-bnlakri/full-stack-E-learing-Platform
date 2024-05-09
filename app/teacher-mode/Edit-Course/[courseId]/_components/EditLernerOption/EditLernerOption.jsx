'use client'
import React,{useState,useEffect} from 'react'
import style from './EditLernerOption.module.scss'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function EditLernerOption({course}) {
  const [open, setOpen] = useState(false)
  const router= useRouter()
    const [learningOptions, setlearningOptions] = useState("")
   const [laoding, setlaoding] = useState(false)
    const onSubmit=()=>{
      if(!learningOptions){
        return toast.error("it's better to add a learningOptions") 
      }
      const learningOptionsArr=learningOptions.split(" ")
      console.log(learningOptions.split(" "),learningOptionsArr)
      sendData()
    }
    const sendData=async()=>{
      setlaoding(true)
      const res=await fetch(`http://localhost:3000/api/course/${course.id}`,{method:'PUT',body:JSON.stringify({
        id:course.id,
        learningOptions:learningOptions.split(" ")
      })})
      if(res.ok){
        router.refresh()
        setlaoding(false)
        setOpen(false)
        toast.success("learningOptions Aded")
      }
        else{
          toast.error("Could't Aded learningOptions")
          setlaoding(false)
        }
    }
    useEffect(() => {
      setlearningOptions(course.learningOptions.map(item => item+" "));
    },[course])
    
  return (
    <div className={style.editTitle}>
        <div className={style.head}>
            <div className={style.left}>
              Course learningOptions
            </div>
            <div onClick={()=>setOpen(!open)} className={style.right}>
               <EditOutlinedIcon/>  Edit title
            </div>
        </div>
          {!open?<p>{learningOptions?learningOptions:<i style={{color:"gray"}}>No Learning Options</i>}</p>:<>
          <TextField sx={{background:"white"}} value={learningOptions} onChange={(e)=>setlearningOptions(e.target.value)} multiline rows={1} maxRows={4} label="what the learner will gain" placeholder='please separate them with a space e.g HTML CSS JAVA_SCRIPT' variant="outlined"/>
          <LoadingButton className={style.button}  size="small" onClick={onSubmit} loading={laoding}  variant="contained">
          <span>Save</span>
        </LoadingButton>
          </>} 
    </div>
  )
}

export default EditLernerOption