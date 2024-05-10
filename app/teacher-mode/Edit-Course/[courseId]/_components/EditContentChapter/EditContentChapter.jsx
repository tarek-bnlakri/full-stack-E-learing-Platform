'use client'
import React,{useState,useEffect,useRef} from 'react'
import style from './EditContentChapter.module.scss'
import FroalaEditor from 'react-froala-wysiwyg'
import "froala-editor/js/plugins/image.min.js"
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins.pkgd.min.css';
import 'froala-editor/js/languages/de.js';
import toast from 'react-hot-toast'
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation'



function EditContentChapter({chapter}) {
const router =useRouter()
const [content, setContent] = useState(null);
const [active, setactive] = useState(false)
const [loading, setLoading] = useState(false)
const [image, setImage] = useState(null)
useEffect(() => {
  if(typeof window !== 'undefined'){
    setactive(true)
    setContent(chapter.content)
  }
}, [])

const setContentOfchapter=async()=>{
        setLoading(true)
        const res= await fetch(`/api/chapter`,{method:"PUT",body:JSON.stringify({
          id:chapter.id,
          content

        })})
        if(res.ok){
          router.refresh()
          toast.success("content aded")
          setLoading(false)
          return
        }
    }



  const handleModelChange = (model) => {
    setContent(model);
    console.log(content)
   
};





if(active){
  return (
    <div className={style.container}>
       <FroalaEditor
                
                tag='textarea'
                config={{
                }} 
                model={content} 
                onModelChange={handleModelChange} 
            />
        <LoadingButton className={style.button}  size="small" onClick={setContentOfchapter} loading={loading}  variant="contained">
          <span>Save</span>
        </LoadingButton>
    </div>
  )
}
}

export default EditContentChapter
