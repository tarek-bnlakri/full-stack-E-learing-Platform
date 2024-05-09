'use client'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React,{useState,useEffect}from 'react'
import style from './HeadEditCourse.module.scss'
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
function HeadEditCourse({name,course,chapter}) {
  const router=useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [totalCourse, settotalCourse] = useState(6)
  const [total, settotal] = useState(2);
  const [totallChapter, setTotallChapter] = useState(null);
  
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
        const calculateTotal = (course) => {
          let total = 0;
          if (course.objective) {
              total += 1;
          }
          if (course.catID) {
            total += 1;
        }
          if (course.title) {
            total += 1;
        }
          if (Array.isArray(course.learningOptions) && course.learningOptions.length > 0) {
              total += 1;
          }
          if (course.img !== null) {
              total += 1;
          }
          if (Array.isArray(course.chapters) && course.chapters.some(chapter => chapter.publish)) {
              total += 1;
          }

          return total;
      };
      const updatePublish=async()=>{
        setLoading(true)
        const res=await fetch(`http://localhost:3000/api/course/${course.id}`,{method:'PUT',body:JSON.stringify({
          id:course.id,
          publish:course.publish==false?true:false
        })})
        if(res.ok){
          router.refresh()
          toast.success(`${course.publish === true ? "Course is UnPublish now" : "Course is Publish now"}`)
          setLoading(false)
        }
          else{
            toast.error("Could't publish course")
            setLoading(false)
          }
      }

      const deleteCourse=async()=>{
        const res=await fetch(`http://localhost:3000/api/course/${course.id}`,{method:"DELETE",body:JSON.stringify({
          id:course.id
        })})
        if(res.ok){
          toast.success("Course deleted")
          router.push('/courses')

        }else{
          toast.error("The Course was not deleted")
        }
      }

      const totall = calculateTotal(course);
        
        return (
          <div className={style.container}>
            <div className={style.left}>
              <h2>Course Setup</h2>
              <p>Complete all fields ({totall}/{totalCourse})</p>
            </div>
            <div className={style.right}>
              <LoadingButton sx={{}} size="small" className={style.publish} disabled={loading||totall!=totalCourse} onClick={updatePublish} loading={loading} variant="outlined">
              <span>{course.publish === true ? "Unpublish" : "Publish"}</span>

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
                {" Are You Sure You Want To Delete This Course?"}
              </DialogTitle>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cansel
                </Button>
                <Button onClick={deleteCourse} autoFocus>
                  Yes I want
                </Button>
              </DialogActions>
            </Dialog>
            
          </div>
        )
}

  
  


export default HeadEditCourse