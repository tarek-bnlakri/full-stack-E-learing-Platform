import { createSlice } from "@reduxjs/toolkit";

export const RatingtSlice= createSlice({
    name:"rating",
    initialState:{
        courseIdRedux:'',
        ratingRedux:0
    },
    reducers:{
        setCourseIdRedux:(state,action)=>{
            state.courseIdRedux=action.payload
        },
        setRatingRedux:(state,action)=>{
            state.ratingRedux=action.payload
        }
    }
})

export const {setCourseIdRedux,setRatingRedux}=RatingtSlice.actions
export default RatingtSlice.reducer