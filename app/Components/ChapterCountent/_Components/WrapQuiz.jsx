"use client"
import React,{useEffect, useState} from 'react'
import Quiz from './Quiz'
import style from "../CourseCountent.module.scss"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

function WrapQuiz({quiz}) {
  const [open, setOpen] = React.useState(false);
  const [quizes, setQuizes] = useState(null)
  const [loading, setLoading] = useState(false)
 
  const handleClose = () => {
    setOpen(false);
  };
 useEffect(()=>{
  
    setQuizes(quiz)
 },[quiz])

  const handleClickOpen = () => {
    setOpen(true);
  };

console.log(quiz)
 
  return (
    <>  
    <Button sx={{width:"max-content"}} onClick={handleClickOpen} variant="outlined">Start Quize</Button>
       {/* <Button variant="outlined" onClick={handleClickOpen}>
        Start Quiz for this chapter
      </Button> */}
      {quizes&&<Dialog
        open={open}
        onClose={handleClose}>
          <Quiz quiz={quizes}/>
      </Dialog>}
      
        
    </>
   
  )
}

export default WrapQuiz