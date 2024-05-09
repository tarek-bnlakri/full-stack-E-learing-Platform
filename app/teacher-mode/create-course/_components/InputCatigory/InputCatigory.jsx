'use client'
import  React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

const filter = createFilterOptions();

export default  function InputCatigory({catigory,setCatigory,setChange}) {
const [value,setValue]=useState('')

const [data, setData] = useState(null)
const [loading, setloading] = useState(false)
useEffect(() => {
  const getCatigories=async()=>{
    setloading(true)
    const res = await fetch(`/api/catigory`)
      if(res.ok){
        const data=await res.json()
        setData(data)
        setloading(false)
      }
  }
  getCatigories()
}, [])

if(loading){
  return <p>loading..</p>
}else{
  return (
    <Autocomplete
      
      value={catigory}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
              if(setChange){
                setChange(true)
              }
            setCatigory({
            titleCatigory: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
            if(setChange){
              setChange(true)
            }
          setCatigory({
            titleCatigory: newValue.inputValue,
          });
        } else {
          if(setChange){
            setChange(true)
          }
            setCatigory(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.titleCatigory);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            titleCatigory: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.titleCatigory;
      }}
      renderOption={(props, option) => <li key={option.id} {...props}>{option.titleCatigory}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField onChange={(e)=>setValue(e.target.value)} value={value} sx={{backgroundColor:"white"}} {...params} label="Chouse Catigory" />
      )}
    />
  );
}
}


