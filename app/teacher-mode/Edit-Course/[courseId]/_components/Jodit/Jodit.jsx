'use client'
import React, { useState, useRef, useMemo,useEffect } from "react";
import JoditEditor from "jodit-react";
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import style from './Jodit.module.scss'
export const Jodit = ({chapter}) => {

    const router =useRouter()
const [content, setContent] = useState(null);
const [active, setactive] = useState(false)
const [loading, setLoading] = useState(false)
const [image, setImage] = useState(null)
    console.log(content)
        const editor = useRef(null);
        const config = useMemo(
                () => ({
                // inline: true,
                toolbarInlineForSelection: true,
                showPlaceholder: false,
                buttons:
                "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,image,video,hr,table,link,symbols,indent,outdent".split(
                ","
                ),
                // preset: "inline",
                }),
                []
        );
useEffect(() => {
    if(typeof window !== 'undefined' &&process.browser){
        setactive(true)
        setContent(chapter.content)
    }
    }, [chapter])

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
    
    return (<>
        {active&&<JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
        />}
         <LoadingButton className={style.button}  size="small" onClick={setContentOfchapter} loading={loading}  variant="contained">
          <span>Save</span>
        </LoadingButton>
    </>
    );
};
export default Jodit
