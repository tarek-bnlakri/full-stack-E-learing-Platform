import React from 'react'
import  './Advertisme.scss'
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const style={
  width:"50px",
  height:"50px"
}
const data =[
    {id:1,icon:<SchoolIcon sx={style}/>,title:"Skilled Instructors",desc:"Learn from industry experts and skilled instructors"},
    {id:2,icon:<LanguageIcon sx={style}/>,title:"Online classes",desc:"Access diverse courses anytime, anywhere with online classes."},
    {id:3,icon:<HomeIcon sx={style}/>,title:"Home Projects",desc:"Explore your creativity with engaging home projects."},
    {id:4,icon:<MenuBookIcon sx={style}/>,title:"Book Library",desc:`Dive into a vast collection of knowledge with our book library.`}]
function Advertisme() {
  return (
    <div id='Services' className='Advertisme'>
        {data.map(item=>
        <div key={item.id} className='item'>
            <div className='icon'>{item.icon}</div>
            <h5 className='title'>{item.title}</h5>
            <p  className='parag'>{item.desc}</p>
        </div>)
        }
        
       
    </div>
  )
}

export default Advertisme