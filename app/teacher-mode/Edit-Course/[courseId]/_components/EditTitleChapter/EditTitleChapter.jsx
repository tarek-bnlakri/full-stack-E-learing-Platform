'use client'
import React,{useState,useEffect} from 'react'
import style from './EditTitleChapter.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function EditTitleChapter({chapter}) {
  const dispatch= useDispatch()
 console.log(chapter)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [laoding, setlaoding] = useState(false)
  const [changed, setChanged] = useState(false)
  const router=useRouter()
  useEffect(() => {
    
  setValue(chapter.chapterName)
    
  }, [chapter])
  const updateTitle=async()=>{
    setlaoding(true)
    const res=await fetch(`/api/chapter`,{method:'PUT',body:JSON.stringify({
      id:chapter.id,
      chapterName:value
    })})
    if(res.ok){
      toast.success("Title Updated")
      router.refresh()
      setlaoding(false)
      setChanged(false)
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
              Chapter Title
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

export default EditTitleChapter
