import { createSlice } from "@reduxjs/toolkit";

export const NewCourseSlice= createSlice({
    name:"courseOption",
    initialState:{
         Courseoption:{
            title:1,
            description:0,
            image:0,
            catigory:0,
            learnerOption:0,
            chapter:0
         }
    },
    reducers: {
        setTitle: (state) => {
            state.Courseoption.title=1;
        },
        setDescriptionOption: (state) => {
            state.Courseoption.description=1;
        },
        setImage: (state) => {
            state.Courseoption.image=1;
        },
        setCatigoryOption: (state) => {
            state.Courseoption.catigory=1;
        },
        setLearnerOption: (state) => {
            state.Courseoption.learnerOption=1;
        },
        setChapter: (state) => {
            state.Courseoption.chapter=1;
        },
        
    }
});
export const {setTitle,
    setDescriptionOption,
    setImage,
    setCatigoryOption,
    setLearnerOption,
    setChapter}=NewCourseSlice.actions;
export default NewCourseSlice.reducer