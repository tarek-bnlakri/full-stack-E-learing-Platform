import React from 'react'
import  './About.scss'
import Link from 'next/link'
import EastIcon from '@mui/icons-material/East';
function About() {
  const style={
    color:"#8e44ad"
  }
  return (
    <div id='About' className='About'>
      <div className='imageContainer'>
        <img src="/about.jpg" alt="" />
      </div>
      <div className='textContainer'>
        <div className='titleAboutContainer'>
            <p className='blue'>ABOUT US</p>
            <p className='lineContainer'>
              <span className='fline'></span>
              <span className='lline'></span>
            </p>
        </div>
        <h1 className='welcome'>
          Welcome to eLEARNING
        </h1>
        <p>Welcome to eLEARNING, your premier destination for accessible and engaging online education. We are committed to providing a dynamic learning environment that caters to diverse interests and levels of expertise. Whether you re a seasoned professional looking to expand your skills or a curious learner eager to explore new topics, our platform offers a wide range of courses designed to inspire and empower</p>
        <p>With innovative tools and expert instructors, we aim to cultivate a community where knowledge knows no bounds. Join us on a journey of discovery and transformation at eLEARNING today!</p>
        <div className='linkContainer'>
          <div className='item'>
            <div className='iconAndTxt'>
             <EastIcon sx={style}/>
              Skilled Instructors
            </div>
            <div className='iconAndTxt'>
             <EastIcon sx={style}/>
              International Certificate
            </div>
            <div className='iconAndTxt'>
               <EastIcon sx={style}/>
               Online Classes
            </div>
          </div>
          <div className='item'>
            <div className='iconAndTxt'>
               <EastIcon sx={style}/>
              Flexible Online Classes
            </div>
            <div className='iconAndTxt'>
                <EastIcon sx={style}/>
              Community Support
            </div>
            <div className='iconAndTxt'>
                <EastIcon sx={style}/>
               Interactive Learning Tools
            </div>
          </div>
        </div>
        <div className='buttonAbout'>
          <Link className="a" href={'/login'}>Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default About