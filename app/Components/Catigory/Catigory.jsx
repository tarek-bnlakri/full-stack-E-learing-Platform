import React from 'react'
import styles from "./Catigory.module.scss"

function Catigory() {
  return (
    <div id='Category' className={styles.Catogory}>
      
      <div className={styles.head}>
        <div className={styles.blueTitle}>
            <p className={styles.left}>
              <span className={styles.fl}></span>
              <span className={styles.ll}></span>
            </p>
            <h3>Catigorries</h3>
            <p className={styles.right}>
              <span className={styles.fl}></span>
              <span className={styles.ll}></span>
            </p>
        </div>
        <h1>Courses Categories</h1>

      </div>
        
        <div className={styles.bodyCat}>
          <div className={styles.left}>
            <div className={styles.top}>
              <img src="/cat-1.jpg" alt="" />
              <div className={styles.title}>
                <span className={styles.min_title}>Web Design</span>
                <span className={styles.color}>49 courses</span>
              </div>
            </div>
            <div className={styles.bottem}>
                <div className={styles.left}>
                  <img src="/cat-2.jpg" alt="" />
                  <div className={styles.title}>
                    <span className={styles.min_title}>Science</span>
                    <span className={styles.color}>49 courses</span>
                  </div>
              </div>
              <div className={styles.right}>
                 <img src="/cat-3.jpg" alt="" />
                  <div className={styles.title}>
                    <span className={styles.min_title}>Web Devlopment</span>
                    <span className={styles.color}>49 courses</span>
                  </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <img src="/cat-4.jpg" alt="" />
              <div className={styles.title}>
                <span className={styles.min_title}>Computer Science</span>
                <span className={styles.color}>49 courses</span>
              </div>
          </div>
          
        </div>
        <div className={styles.mobileContainer}>
              <div className={styles.right}>
                <img src="/cat-1.jpg" alt="" />
                <div className={styles.title}>
                  <span className={styles.min_title}>Web Design</span>
                  <span className={styles.color}>49 courses</span>
                </div>
              </div>
              <div className={styles.right}>
                  <img src="/cat-2.jpg" alt="" />
                  <div className={styles.title}>
                    <span className={styles.min_title}>Web Devlopment</span>
                    <span className={styles.color}>49 courses</span>
                  </div>
              </div>
              <div className={styles.right}>
                 <img src="/cat-3.jpg" alt="" />
                  <div className={styles.title}>
                    <span className={styles.min_title}>Science</span>
                    <span className={styles.color}>49 courses</span>
                  </div>
              </div>
              <div className={styles.right}>
                <img src="/cat-4.jpg" alt="" />
                  <div className={styles.title}>
                    <span className={styles.min_title}>Computer Science</span>
                    <span className={styles.color}>49 courses</span>
                  </div>
              </div>
                
          </div>
        
    </div>
  )
}

export default Catigory