import React from 'react'
import style from './profile.module.scss'
import ButtonUpdate from './ButtonUpdate'
import Card from '@/app/Components/Card/Card'
import { getAuthSession } from '@/util/auth'
import { redirect } from 'next/navigation'
const getData=async(email)=>{
  try {
    const res= await fetch(`/api/user/${email}`)    
    const data= await res.json();
    return data
  } catch (error) {
        console.log(error)
  }
    
}

async function Profile({params}) {
    const {userEmail}=params
    const session = await getAuthSession()

   
    if(!session){
        redirect('/')
    }
    
    const data= await getData(userEmail)
  console.log(data)
    const {courses}=data
    
    const items = courses
  .filter(item => item.publish === true)
  .map(item => ({
    ...item,
    progression: []
  }));
      
    console.log(items)
  return (
        <div className={style.container}>
            <div className={style.head}>
                
                {data.email===session.user.email?<h1>My Profile</h1>:<h1>Profile:</h1>} 
                <div className={style.linee}></div>
            </div>
            
            <div className={style.profile}>
                    <img src={data.image} alt="" />
                    <h3>{data.name}</h3>
                    {courses.length>0?<p>Teacher</p>:<p>Student</p>}
                     
            </div>

            {
            courses.length&& <>
                    <div className={style.head}>
                       {data.email===session.user.email?<h1>My Courses</h1>:<h1>His Courses</h1>} 
                        <div className={style.linee}></div>
                    </div>

                    <div className={style.wrraper}>
                            {items.map(item=><Card key={item.id} item={item}/>)}
                    </div>
                </>
            } 

            
        </div>
    
      
    )

}

export default Profile
