import React from 'react'
import style from './Dashboard.module.scss'
import DashBordHead from '@/app/Components/DashBordHead/DashBordHead'
import { getAuthSession } from '@/util/auth'
import Card from '@/app/Components/Card/Card'
import { redirect } from 'next/navigation'

async function Dashboard({params}) {
    const {userEmail}=params
  const session = await getAuthSession()
  if(!session){
    redirect('/')
  }
  const getData =async()=>{
    try {
        const res= await fetch(`https://full-stack-e-learing-platform-with-tarek.vercel.app/api/prog?userEmail=${session.user.email}`,{cache:"no-cache",method:"GET"})
        
        if(!res.ok)
          throw new Error("Somthing wrong")
        const data= await res.json()
        return data
    } catch (error) {
      console.log(error)
    }
}
const data= await getData()

if(data){

  const newData = data.map(item => ({
    ...item,
    rating: item.couments.find(item2 => item2.courseId === item.id)?.rating || null
  }));
  // let totalProgression=0;
  // data.map(item=>{
  //   totalProgression+=item.progression.length
  // })
 
  // console.log(totalProgression)
  return (
    <div className={style.Home}>
        <DashBordHead data={data}/>
        {
          <div className={style.courseWrapper}>
            {newData.map(item => (
              <Card key={item.id} item={item} />
              ))}
          </div>
        
        }
    </div>
  )
}
else{
  return <h1>No Courses Founde</h1>
}
}

export default Dashboard
