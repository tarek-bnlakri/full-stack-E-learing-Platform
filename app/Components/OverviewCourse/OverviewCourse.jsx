import React from 'react'
import style from './OverviewCourse.module.scss'
import StarOutlineTwoToneIcon from '@mui/icons-material/StarOutlineTwoTone';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Link from 'next/link';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import ButtonAllReview from '../ButtonAllReview/ButtonAllReview';
import BoxComment from '../BoxComment/BoxComment';
import Card from '../Card/Card';
import { Rating } from '@mui/material';

function OverviewCourse({data}) {
    let sumUserRating = 0;
    const { couments } = data;
    console.log(data)
sumUserRating = couments.reduce((sum, item) => sum + item.rating, 0);
  return (
    <div className={style.container}>
        <div className={style.head}>
            <div className={style.content}>
                <h1>{data.title}</h1>
                <p className={style.min_descr}>{data.objective}</p>
                <div className={style.rating}>
                    {data.couments.length>0?
                    <div className={style.raitingbr}>
                             {(sumUserRating / couments.length).toFixed(2)}
                       <Rating value={sumUserRating/couments.length} readOnly/>
                    </div>:"No rating"
                    } 
                    <span className={style.pepRat}>{data.couments.length} ratings</span>
                            <span>1000 Students</span>
                </div>
                <p className={style.creat}>Created By <Link href={`/profile/${data.userEmail}`}>Dr.{data.user.name}</Link> in {new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className={style.img}>
                <img src={data.img} alt="" />
            </div>
        </div>
        <div className={style.description}>
                <h2>what you will learn </h2>
                <ul>
                    {data.learningOptions.map(item=><li key={item}>{item}</li>)}

                </ul>
        </div>
        <div className={style.Instructor}>
            <h2>Instructor</h2>
            <Link href={`/profile/${data.userEmail}`}>Dr.{data.user.name}</Link>
            <div className={style.info}>
                <img src={data.user.image} alt="" />
                <div className={style.colom}>
                    <span><StarPurple500OutlinedIcon fontSize='small'/> 4.7 instructor Rating</span>
                    <span><GroupOutlinedIcon fontSize='small'/> 24545 Students</span>
                    <span><ImportContactsSharpIcon fontSize='small'/> {data.user.courses.length} Courses</span>
                </div>
            </div>
            <div className={style.Bio}>
              {data.user.bio?data.user.bio:<p>No Bio</p>} 
            </div>
        </div>
       <>
        
             {(data.couments.length>0 && data.couments.length<3)&&<div className={style.review}>
            <h2>Students Said</h2>
            <div className={style.wrraper}>
                {data.couments.map(item=> <BoxComment key={item.id} item={item}/>)}
            </div>
            
                </div>
             }
            {<div className={style.review}>  <h2>Students Said</h2>{data.couments.length >=3 &&<ButtonAllReview data={data}/>}</div>}
        </>
       {data.user.courses.length>1&&<div className={style.courses}>
            <h4>More Courses by <span> Dr.{data.user.name}</span></h4>
            <div className={style.wrapper}>
                {data.user.courses.filter(item =>item.id !== data.id).map(item => <Card key={item.id} item={item} />)  
                }
            </div>

        </div>} 
    </div>
  )
}

export default OverviewCourse
