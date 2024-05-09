import React from 'react'
import styles from './Reviews.module.scss' 

const data=[
{id:0,img:'/t1.jpg',name:"Raouf",role:"Designer"},
{id:1,img:'/t2.jpg',name:"Angel",role:"senior developer "},
{id:2,img:'/t3.jpg',name:"Tarek",role:"software engineering"},
{id:3,img:'/t4.jpg',name:"women",role:"web developer"}
]
function Reviews({review}) {
  return (
    <div className={styles.Reviews}>
        <div className={styles.head}>
        <div className={styles.blueTitle}>
            <p className={styles.left}>
              <span className={styles.fl}></span>
              <span className={styles.ll}></span>
            </p>
            <h3>Expert {review}</h3>
            <p className={styles.right}>
              <span className={styles.fl}></span>
              <span className={styles.ll}></span>
            </p>
        </div>
        <h1>Expert {review}</h1>

        </div>
        <div className={styles.bodyRev}>
          {data.map(item=><div className={styles.box} key={item.id}>
                <img src={item.img} alt="" />
                <div><h3>{item.name}</h3>
                <h5>{item.role}</h5></div>
                
            </div>)}
        </div>
    </div>
  )
}

export default Reviews