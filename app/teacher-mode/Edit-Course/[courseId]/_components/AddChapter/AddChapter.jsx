'use client'
import React,{useState,useEffect} from 'react'
import style from './AddChapter.module.scss'
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
function AddChapter({course}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [chapter, setChapter] = useState([])
  const router=useRouter()
 
  const handleClick=async()=>{
      if(!value){
        return toast.error("chapter name is required")
      }
      setLoading(true)
      const res= await fetch(`http://localhost:3000/api/chapter`,{method:"POST",body:JSON.stringify({
        chapterName:value,
        courseID:course.id
      })})
      if(res.ok){
        const data= await res.json()
        router.refresh()
        setChapter([...chapter, data]);
        setLoading(false)
        toast.success("chapter created ")
        setOpen(false)
      }else{
        toast.error("could't create chapter")
        setLoading(false)
        console.log(res)
      }
      
  }
  const deleteChapter=async(id)=>{
      const res=await fetch(`http://localhost:3000/api/chapter?id=${id}`,{method:"DELETE"})
      if(res.ok){
        toast.success("Chapter deleted")
        router.refresh()
      }else{
        toast.error("the chapter was not delete")
      }
  }
  useEffect(() => {
   setChapter(course.chapters)
  }, [course])
  
  console.log(chapter)
  return (
    <div className={style.editTitle}>
        <div className={style.head}>
            <div className={style.left}>
              Course chapters
            </div>
            
            <div onClick={()=>setOpen(!open)} className={style.right}>
                 <ControlPointOutlinedIcon /> Add a chapter
            </div>
        </div>
          {!open?<p style={{color:"grey"}}><i>{chapter.length==0?"No chapters":""}</i></p>:<>
          <TextField sx={{backgroundColor:"white"}} value={value} onChange={(e)=>setValue(e.target.value)} className={style.input} label="Chapter Name" variant="outlined"/>
          <LoadingButton sx={{width:"max-content"}}  size="small" onClick={handleClick} loading={loading} variant="contained">
          <span>Save</span>
          </LoadingButton>
          </>}
          {chapter&&chapter.map(item=><div key={item.id} className={style.link} >
            <div className={style.left}><DragIndicatorIcon/><span>{item.chapterName}</span></div>
            <div className={style.right}>
              <IconButton onClick={() => deleteChapter(item.id)} aria-label="delete">
                <DeleteIcon sx={{color:"#f5554a"}} />
            </IconButton >
            {item.publish?<span className={style.publish}>Published</span>:<span className={style.Unpublish}>Unpublished</span>}
            <Link href={`?editChapter=${item.id}`}><EditOutlinedIcon/></Link>
            </div>
            </div>)}
      </div>
  )
}

export default AddChapter