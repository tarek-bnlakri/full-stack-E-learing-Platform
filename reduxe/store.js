import { configureStore } from "@reduxjs/toolkit";
import SideBarReducer from './reducers/SideBarReducer'
import CommentCompReducer from "./reducers/CommentCompReducer";
import NewCommentsReducer from "./reducers/NewCommentsReducer";
import RatingReducer from "./reducers/RatingReducer";
import NewCourseReducer from "./reducers/NewCourseReducer";

export default configureStore({
    reducer:{
        sideBar:SideBarReducer,
        comment:CommentCompReducer,
        newcomment:NewCommentsReducer,
        rating:RatingReducer,
        courseOption:NewCourseReducer
    }
})