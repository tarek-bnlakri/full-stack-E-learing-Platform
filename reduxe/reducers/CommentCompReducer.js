import { createSlice } from "@reduxjs/toolkit";

export const CommentSlice= createSlice({
    name:"comment",
    initialState:{
        open:false
    },
    reducers:{
        setOpen:(state,action)=>{
            state.open=action.payload
        }
    }
})

export const {setOpen}=CommentSlice.actions
export default CommentSlice.reducer