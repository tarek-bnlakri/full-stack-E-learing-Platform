import { createSlice } from "@reduxjs/toolkit";

export const NewCommentSlice= createSlice({
    name:"newcomment",
    initialState:{
        open:false,
        courseId:'',
        rating:0
    },
    reducers:{
        setOpen:(state,action)=>{
            state.open=action.payload
        },
        setCoursId:(state,action)=>{
            state.courseId=action.payload
        },
        setRating:(state,action)=>{
            state.rating=action.payload
        }
    }
})

export const {setOpen,setCoursId,setRating}=NewCommentSlice.actions
export default NewCommentSlice.reducer