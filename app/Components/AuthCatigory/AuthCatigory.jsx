import React from 'react'
import style from './AuthCatigory.module.scss'
import Link from 'next/link'


const getData= async()=>{
  const res= await fetch(`http://localhost:3000/api/catigory`,{cache:"no-cache"})
  if(!res.ok){
    throw new Error(`Error fetching`)
  }
  const data= await res.json()
  return data
}

async function AuthCatigory({catid}) {
 
  
  const data= await getData()
  return (
    <div className={style.countainer}>
      <div className={style.wrapper}>
        <Link className={!catid?style.activeLink:""}  href={`/courses`}>All</Link>
        {data.map(item=><Link className={catid===item.titleCatigory?style.activeLink:""}  href={`?catid=${item.titleCatigory}`} key={item.id}>{item.titleCatigory}</Link>)}
      </div>
    </div>
  )
}

export default AuthCatigory