'use client'
import React,{useState,useEffect} from 'react'
import style from './teachers.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { getAuthSession } from '@/util/auth';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
 function Teachers() {
  const router=useRouter()
  const{data,status}=useSession()

  if(status ==='unauthenticated')
      router.push('/')
  const [loading, setLoading] = useState(false)
  const [teatcherCourse, setTeatcherCourse] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 
  useEffect(() => {
      const getData=async()=>{
        setLoading(true)
          const res= await fetch(`/api/teatcher`,{cache:"no-store"})
          if(!res.ok){
            setLoading(false)
            throw new Error("Coudn't get User Courses")
          }else{
            setLoading(false);
            const data= await res.json();
            setTeatcherCourse(data)

          }
      }
      getData()
  },[])
  if(loading){
    return<h1>Loading....</h1>
  }
  return (
    <div className={style.countainer}>
        <div className={style.head}>
           <Button className={style.btn} variant="contained"><Link href={'/teacher-mode/create-course'}><AddCircleOutlineIcon/> Add New Course</Link></Button>
        </div>
        <TableContainer component={Paper}>
      <Table sx={{width:"100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Title</TableCell>
            <TableCell align="center">Date Publish</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Catigory</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
          {teatcherCourse&&<>
            {teatcherCourse.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell >{row.title}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">{row.publish? <Chip label="Publish" color="success" />:<Chip label="Unpublish" color="primary" variant="outlined" />}</TableCell>
                <TableCell align="center">{row.catID}</TableCell>
                <TableCell align="center">
                  <Button color='warning' variant="contained"><Link href={`/teacher-mode/Edit-Course/${row.id}`}>Edit
                </Link>
                </Button>
                 
                </TableCell>
            </TableRow>
          ))}
          </>}
          </>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Teachers