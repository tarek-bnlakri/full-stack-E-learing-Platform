'use client'
import React,{useState,useEffect} from 'react'
import style from './create-course.module.scss'
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import InputCatigory from './_components/InputCatigory/InputCatigory';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


function CreateCourse() {
    const router=useRouter()
    const session=useSession()
    if(!session){
            router.push('/')
    }
    const [title, setTitle] = useState('')
    const [catigory, setCatigory] = useState(null)
    const [submit, setsubmit] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
      const getCatigories=async()=>{
        console.log("is fetch")
        setLoading(true)
        
        const res=await fetch(`/api/catigory`)
        if(res.ok){
            const data = await res.json()
            setData(data)
            setLoading(false)
        }
        else{
            toast.error("Somthing Wrong")
        }
            
      }
      getCatigories()
    },[])
    
    const onSubmit=()=>{
            console.log(catigory)
            if(!title){
                setError(true)
                return toast.error("Please enter a title")
            }
            if(!catigory){
                return toast.error("Please enter a catigory")
            }
            newCourse()
    }
   
    const newCourse=async()=>{
        toast.loading("wait..")
        setLoading(true)
        const res=await fetch(`/api/course`,{method:"POST",body:JSON.stringify({
            title,
            catigory
        })})
        if(res.ok){
            const course= await res.json()
            console.log(course.id)
            console.log(res)
            setLoading(false)
            toast.remove()
            toast.success("Course Created")
            router.push(`/teacher-mode/Edit-Course/${course.id}`)
        }
    }
   
  return (
    <div className={!loading?style.container:style.disable}>
        {<div className={style.wrapper}>
            <div className={style.head}> 
                <h1>Name Your Course</h1>
                <p className={style.textGrey}>What Would You like to name your course?Don t Worry,you can alwayse change this later
                </p>
            </div>
            <div className={style.Input}>
                {error?<TextField {...loading?disable:""} error onChange={(e)=>{setError(false);setTitle(e.target.value)}}label="Error" helperText="Title is required."
                variant="standard"
                />:<TextField onChange={(e)=>{setTitle(e.target.value)}} label="Course Tittle" variant="standard" />}            
                    <p className={style.textGrey}>What will you teach in this course </p>
            </div>
           
            <div className={style.catigoryContainer}>
               
                <InputCatigory data={data} catigory={catigory} setCatigory={setCatigory}/>
            </div>

            <div className={style.Buttons}>
                <Button className={style.cancelButton} variant="outlined">Cancel</Button>
                <Button onClick={onSubmit} className={style.continueButton} variant="contained">Continue</Button>
            </div>
        </div>}
    </div>
  )
}

export default CreateCourse
