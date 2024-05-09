
import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';

  
function ButtonIsCompleted() {
  
  return (
    <Button color='success' variant="contained"><TaskAltIcon/>Compluted</Button>
      
  )
}

export default ButtonIsCompleted