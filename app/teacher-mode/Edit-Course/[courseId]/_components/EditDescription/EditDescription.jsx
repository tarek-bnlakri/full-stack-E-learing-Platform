'use client'
import React,{useState,useEffect} from 'react'
import style from './EditDescription.module.scss'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function EditDescription({course}) {
  const router=useRouter()
  const [open, setOpen] = useState(false)
    const [description, setDescription] = useState('')
    const [laoding, setlaoding] = useState(false)
    const [changed, setChanged] = useState(false)
    const onSubmit=()=>{
      if(!description){
        return toast.error("it's better to add a description") 
      }
      
      console.log(description)
      sendData()
    }
    const sendData=async()=>{
      setlaoding(true)
      const res=await fetch(`/api/course/${course.id}`,{method:'PUT',body:JSON.stringify({
        id:course.id,
        objective:description
      })})
      if(res.ok){
        router.refresh()

        setlaoding(false)
        setChanged(false)
        toast.success("Description Aded")
        setOpen(false)
      }
        else{
          toast.error("Could't Aded description")
          setlaoding(false)
        }
    }
    useEffect(() => {
      setDescription(course.objective)
    }, [course])
    
  return (
    <div className={style.editTitle}>
        <div className={style.head}>
            <div className={style.left}>
              Course Description
            </div>
            <div onClick={()=>setOpen(!open)} className={style.right}>
               <EditOutlinedIcon/>  Edit Description
            </div>
        </div>
          {!open?<p>{description?description:<i style={{color:"gray"}}>No description</i>}</p>:<><TextField sx={{background:"white"}} value={description} onChange={(e)=>{setDescription(e.target.value);setChanged(true)}} multiline rows={2} maxRows={4}  label="what the learner will gain" variant="outlined"/>
          <LoadingButton disabled={!changed} className={style.button}  size="small" onClick={onSubmit} loading={laoding}  variant="contained">
          <span>Save</span>
        </LoadingButton>
          </>}
    </div>
  )
}

export default EditDescription
