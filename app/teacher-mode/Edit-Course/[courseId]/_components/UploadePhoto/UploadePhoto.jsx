'use client'
import React,{useState} from 'react'
import Button from '@mui/material/Button';
import style from './UploadePhoto.module.scss'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { UploadButton } from "@/util/uploadthing";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function UploadePhoto({chapter,course}) {
  const router=useRouter()
  const [open, setOpen] = useState(false)
  const [displaybtn, setDisplaybtn] = useState(false)
  const [displayImage, setDisplayImage] = useState(true)
  const [image, setImage] = useState(null)
  console.log(image)
  

  
  if(chapter){
    const onSubmit = async () => {
      const res=await fetch(`/api/chapter`,{method: 'PUT',body: JSON.stringify({
          id:chapter.id,
          image:image[0].url
        })})
        if(res.ok){
          router.refresh()
          setDisplaybtn(false);
          toast.success("image updated")
         return 
        }
        toast.error("Somthing Wrong With the uploading")
      
    }
  return (
    <div className={style.UploadePhoto}>
       
        <div className={style.head}>
            <div className={style.left}>
              Chapter Image
            </div>
            <div onClick={()=>{setOpen(!open)}} className={style.right}>
               <ControlPointOutlinedIcon/> Edit image
            </div>
        </div>
        {(image||chapter.img)&&displayImage?<img onClick={()=>{setImage(null);setDisplayImage(false);setOpen(true)}} src={image?image[0].url:chapter.img}/>:<>
        {open&&<div className={style.body}>
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImage(res)
          setDisplaybtn(true)
          setDisplayImage(true)
        
         
        }}
        onUploadError={(error) => {
          alert(`ERROR`);
        }}
      />
         
        </div>
       }
        </>
        }
         {displaybtn&&<Button onClick={onSubmit} variant="contained">Submit</Button>}
    </div>
  )
  }
  if(!chapter){
    const onSubmit = async () => {
      const res=await fetch(`/api/course/${course.id}`,{method: 'PUT',body: JSON.stringify({
          id:course.id,
          image:image[0].url
        })})
        if(res.ok){
          router.refresh()
          setDisplaybtn(false);
          toast.success("image updated")
         return 
        }
        toast.error("Somthing Wrong With the uploading")
    }
    return (
      <div className={style.UploadePhoto}>
         
          <div className={style.head}>
              <div className={style.left}>
                Course image
              </div>
              <div onClick={()=>{setOpen(!open)}} className={style.right}>
                 <ControlPointOutlinedIcon/> Edit image
              </div>
          </div>
          {(image||course.img)&&displayImage?<img onClick={()=>{setImage(null);setDisplayImage(false);setOpen(true)}} src={image?image[0].url:course.img}/>:<>
          {open&&<div className={style.body}>
          <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImage(res)
            setDisplaybtn(true)
            setDisplayImage(true)
          }}
          onUploadError={(error) => {
            alert(error);
          }}
        />
           
          </div>
         }
          </>
          }
           {displaybtn&&<Button onClick={onSubmit} variant="contained">Submit</Button>}
      </div>
    )
  }



  
}
export default UploadePhoto
