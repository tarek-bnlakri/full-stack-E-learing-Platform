import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice= createSlice({
    name:"sideBar",
    initialState:{
        display:true
    },
    reducers:{
        setDisplay:(state,action)=>{
            state.display=action.payload
        }
    }
})

export const {setDisplay}=sideBarSlice.actions
export default sideBarSlice.reducer