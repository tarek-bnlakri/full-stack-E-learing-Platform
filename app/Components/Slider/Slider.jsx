'use client'
import React ,{useState}from 'react'
import  './Slider.scss'
const data=[{id:0,img:"/p1.jpg"},{id:1,img:"/p2.jpg"}]
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
function Slider() {
    const [img, setImg] = useState(0)
    console.log(img)
  return (
    <div className='Slider'>
        <div style={{transform:`translateX(-${img*100}vw)`}} className="wrraper">
            {data.map(item=><img key={item.id} src={item.img}/>)}
        </div>
        <div className='buttonConta'>
           
            <div className="span" onClick={()=>setImg(img<data.length-1?img+1:0)}><ArrowBackIcon/>
            </div>
           
           
            <div className="span" onClick={()=>setImg(img===0?1:img-1)}><ArrowForwardIcon/>
            </div>
           
        </div>
        <div className='back'></div>
        <div className='text'>
            <p className='title'>best online courses</p>
            <h1>Get educated online <br />from your home</h1>
            
           <div className='joinaAndRead'>
           <Link href={'/login'}><button className='blue'>Read More</button></Link>
           <Link href={'/login'}><button className='white'>Join Now</button>
           </Link>
           </div>
        </div>
    </div>
  )
}

export default Slider