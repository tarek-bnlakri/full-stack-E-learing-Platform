'use client'
import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import style from './UploadImageChapter.module.scss'
import { styled } from '@mui/material/styles';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

function UploadImageChapter() {
  const [open, setOpen] = useState(false)
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <div className={style.UploadePhoto}>
        <div className={style.head}>
            <div className={style.left}>
              Course image
            </div>
            <div onClick={()=>setOpen(!open)} className={style.right}>
               <ControlPointOutlinedIcon/> Edit image
            </div>
        </div>
        {open&&<div className={style.body}>
          <Button component="label" role={undefined} variant="contained"    tabIndex={-1} startIcon={<CloudUploadIcon />}>
              Upload file
              <VisuallyHiddenInput type="file" />
          </Button>
        </div>}
    </div>
  )
}

export default UploadImageChapter