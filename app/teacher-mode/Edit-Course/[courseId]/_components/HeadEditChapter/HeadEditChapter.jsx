'use client'

import style from "./HeadEditChapter.module.scss"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React,{useState,useEffect}from 'react'
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function HeadEditChapter({chapter,course}) {
    const router=useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [total, settotal] = useState(2);
    const [totallChapter, setTotallChapter] = useState(null);
    useEffect(() => {
        const caluclateTotal=(chapter)=>{
          let total = 1
          if (chapter.content) {
            total += 1;
          
        }
        return total
      }
      const totall=caluclateTotal(chapter)
      setTotallChapter(totall)
    },[chapter])
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    if(chapter){
        console.log(chapter)
        const updateTitle=async()=>{
          setLoading(true)
          const res=await fetch(`http://localhost:3000/api/chapter`,{method:'PUT',body:JSON.stringify({
            id:chapter.id,
            publish:chapter.publish==false?true:false
          })})
          if(res.ok){
            toast.success("chapter is  publish now ")
            router.refresh()
            setLoading(false)
            setOpen(false)
          }
            else{
              toast.error("Could't publish chapter")
              setLoading(false)
            }
        }
        const deleteChapter=async(id)=>{
          const res=await fetch(`http://localhost:3000/api/chapter?id=${chapter.id}`,{method:"DELETE"})
          if(res.ok){
            toast.success("Chapter deleted")
            router.push('?')
            router.refresh()
          }else{
            toast.error("the chapter was not delete")
          }
        }
      return (
        <div className={style.container}>
          
          <div className={style.left}>
            <Link href={'?'}><KeyboardBackspaceIcon/>Back To The Course</Link>
            <h2>Chapter Setup</h2>
            <p>Complete all fields ({totallChapter}/{total})</p>
          </div>
          <div className={style.right}>
              <LoadingButton sx={{}} size="small" className={style.publish} disabled={loading||totallChapter!=total} onClick={updateTitle} loading={loading} variant="contained">
              <span>{chapter.publish === true ? "Unpublish" : "Publish"}</span>
      
              </LoadingButton>
              <Tooltip title="Delete">
              <IconButton sx={{color:"red"}} onClick={handleClickOpen} aria-label="delete" size="small">
                  <DeleteIcon fontSize="medium" />
              </IconButton>
              </Tooltip>
          </div>
          <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {" Are You sure You want to delete this chapter?"}
              </DialogTitle>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cansel
                </Button>
                <Button onClick={deleteChapter} autoFocus>
                  Yes I want
                </Button>
              </DialogActions>
            </Dialog>
          
        </div>
      )
      
      }
        
}

export default HeadEditChapter