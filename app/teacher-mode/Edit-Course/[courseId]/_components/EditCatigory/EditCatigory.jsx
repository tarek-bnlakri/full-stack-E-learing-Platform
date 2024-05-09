'use client'
import React,{useState,useEffect} from 'react'
import style from './EditCatigory.module.scss'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InputCatigory from '@/app/teacher-mode/create-course/_components/InputCatigory/InputCatigory';
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function EditCatigory({course}) {
    const router=useRouter()
    const [open, setOpen] = useState(false)
      const [catigory, setCatigory] = useState('')
      const [loading, setLoading] = useState(false)
      const [change, setChange] = useState(false)
      console.log(catigory)

      useEffect(() => {
        setCatigory(course.catID)
      }, [course])
      
     
      const onSubmit=()=>{
        if(!catigory){
          return toast.error("it's better to add a catigory") 
        }
        sendData()
      }
      const sendData=async()=>{
        setLoading(true)
        const res=await fetch(`/api/course/${course.id}`,{method:'PUT',body:JSON.stringify({
          id:course.id,
          catID:catigory
        })})
        if(res.ok){
          router.refresh()
          toast.success("Catigory Aded")
          setLoading(false)
          setOpen(false)
        }
          else{
            toast.error("Could't Aded Catigory")
            setLoading(false)
          }
      }
  return (
    <div className={style.editTitle}>
        <div className={style.head}>
            <div className={style.left}>
              Course Catigory
            </div>
            <div onClick={()=>setOpen(!open)} className={style.right}>
                <EditOutlinedIcon/>
               Edit Catigory
            </div>
        </div>
          {!open?<p>{catigory.titleCatigory||catigory} Catigory</p>:<>
              <InputCatigory setChange={setChange} catigory={catigory} setCatigory={setCatigory}/>
              <LoadingButton disabled={!change} className={style.button}  size="small" onClick={onSubmit} loading={loading}  variant="contained">
                <span>Save</span>
              </LoadingButton>
          </>}
    </div>
  )
}

export default EditCatigory
