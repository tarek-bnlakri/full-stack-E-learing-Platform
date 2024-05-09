'use client'
import React from 'react'
import style from './Card.module.scss'
import Link from 'next/link'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setOpen,setCoursId} from '@/reduxe/reducers/NewCommentsReducer';
import NewComment from '../NewComment/NewComment';
import RatingComponat from '../RatingComponat/RatingComponat';


function Card({item}) {
  const open=useSelector(state=>state.newcomment.open)
  const courseIdRedux=useSelector(state=>state.rating.courseIdRedux)
  const ratingRedux=useSelector(state=>state.rating.ratingRedux)
  const courseId=useSelector(state=>state.newcomment.courseId)
  const rating=useSelector(state=>state.newcomment.rating)
  const dispatch=useDispatch()
 
const handleClick=()=>{
  dispatch(setOpen(true))
  dispatch(setCoursId(item.id))
 
}
console.log(item)
  return (<div className={style.Card}>
             {open&&<NewComment rating={item.rating}  courseId={courseId}/>}
            <Link className={style.link} href={`/courses/${item.id}`} >
                <div className={style.image}>
                    <img src={item.img} alt="" />
                </div>
                <div className={style.text}>
                    <h4 className={style.title}>{item.title}
                    <p className={style.catigorie}>{item.catID}</p>
                    </h4>
                    
                    <div className={style.chapters}>
                        <div className={style.icon}><MenuBookTwoToneIcon/></div>
                        {item.chapters&&<div className={style.text}>{item.chapters.length} Chapters</div>}
                    </div>
                      {
                          item.user&&<p className={style.creater}>
                           <span className={style.creat}> Created by </span><span className={style.name}>{item.user.name}</span>
                          </p>
                      }
                      <p className={style.date}>
                      {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
             
                     
                    </div>
                  </Link>
                      <>
                      {item.progression&&
                        <>
                   {item.progression.length>0&&
                     <div className={style.bottem}>
                       <progress  className={((item.progression.length)/(item.chapters.length))===1?style.complete:style.progressBar} max={100} value={(item.progression.length)/(item.chapters.length)*100}
                       />
                        <div key={item.id}  className={style.progVal}>
                          <span className={((item.progression.length)/(item.chapters.length))===1?style.complete:""}>{((item.progression.length)/(item.chapters.length)*100).toFixed(2,2)}%<br/>Complete
                          </span>
                           
                            <div onClick={handleClick}>
                              {item.id===courseId?<RatingComponat rating={rating}/>:<RatingComponat rating={item.rating}/>}
                            </div>
                        </div>
                       
                     </div>
                    }   
                    </>
                  }  
                    </> 
    </div>
  )
}

export default Card