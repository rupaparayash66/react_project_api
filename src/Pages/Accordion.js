import React, { useState } from 'react';
import { Box, Typography, Grid, styled, Paper, Accordion, AccordionActions, AccordionSummary, AccordionDetails, Button, Breadcrumbs, TableHead, TableCell, TableContainer, TableRow, TableBody, Table, colors, TextField, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import axios, { Axios } from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));


// const Deletedata = (e) => {
//   axios.delete(`https://service.apikeeda.com/api/v1/blog/${id}`, {
//     headers: {
//       "x-apikeeda-key": "e1724138964810axk980597553wi",
//       "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVmZjY5NWM4NTZlMzc1NGE2ZTgzYiIsImlhdCI6MTcyMzc5MzQwNSwiZXhwIjoxNzIzOTY2MjA1fQ.kT7tT3jEqR8-Yi3T9_NA-Lz7TwjFtAbMPWHFH8dYwEE"
//     }
//   })
//     .then((res) => {
//       getdatablog();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

// function editdata(id) {
//   axios.patch(`https://service.apikeeda.com/api/v1/blog/${edit}`, {
//     headers: {
//       "x-apikeeda-key": "e1724138964810axk980597553wi",
//       "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVmZjY5NWM4NTZlMzc1NGE2ZTgzYiIsImlhdCI6MTcyMzc5MzQwNSwiZXhwIjoxNzIzOTY2MjA1fQ.kT7tT3jEqR8-Yi3T9_NA-Lz7TwjFtAbMPWHFH8dYwEE"
//     }
//   })
//     .then((res) => {
//       //setedit
//       //setinput
//       getdatablog();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }


function AccordionPage() {

  const [age, setAge] = useState("");
  const [data, setdata] = useState([]);
  const [blogdata, setblogdata] = useState([]);
  const [values, setValues] = useState({
    imgURL: '',
    title: '',
    category:age,
    description: '',
  })
  const token =  window.localStorage.getItem("auth")
  const submit = (e) => {
    e.preventDefault()
    axios.post(` https://service.apikeeda.com/api/v1/blog`, values, {         //inputval
      headers: {
        "x-apikeeda-key": "e1724138964810axk980597553wi",
        "authorization": token
      }
    })
      .then((e) => {
        console.log(e);
      })  
      .catch((err) => {
        console.log(err);
      })
  }

  const categorytogetdata = (e) => {
    axios.get(`https://service.apikeeda.com/api/v1/category`, {
      headers: {
        "x-apikeeda-key": "e1724138964810axk980597553wi",
        "authorization": window.localStorage.getItem("auth")
      }
    })
      .then((res) => {
        setdata(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getdatablog = (e) => {
    axios.get(` https://service.apikeeda.com/api/v1/blog`, {
      headers: {
        "x-apikeeda-key": "e1724138964810axk980597553wi",
        "authorization": Window.localStorage.getItem("auth")
      }
    })
      .then((res) => {
        console.log(res.data.data);
        setblogdata(res.data.data)

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleChange = (event) => {
    setValues(
      {
        ...values,
        [event.target.name]: event.target.value
      }
    )
    console.log(values);
  };

  
  const handleChange1 = (event) => {
    setValues(
      {
        ...values,
        [age]: event.target.value
      }
    )
    console.log(values);
  };

  useState(() => {
    // getdatofcategory(),
    categorytogetdata();
  }, []);
  console.log(age);

  const handlechange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Box>
      <Typography variant="h5"  >
        Accordion
      </Typography>

      <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
        <Link className="Breadcrumb" style={{ color: "#899bbd", fontSize: "14px", textDecoration: "none" }} to="/">
          Home
        </Link>
        <Typography color="#899bbd" fontSize="14px">Components</Typography>
        <Typography color="#273246" fontSize="14px">Accordion</Typography>
      </Breadcrumbs>

      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Movie List
        </Typography>
        <Box sx={{ display: "flex", marginLeft: "10px" }}>
          <form onSubmit={submit}>

            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">LIST</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='category'
                label="LIST"
                value={values.category}
                onChange={handleChange}
              >
                {data.map((item) =>
                (
                  <MenuItem sx={{ width: "100%", textAlign: "center", fontSize: "20px" }} key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                )
                )}
              </Select>
            </FormControl>

            <TextField type='text' sx={{ width: "300px", marginLeft: "50px" }} id="outlined-basic" name='imgURL' label="ADD URL" variant="outlined" value={values.imgURL} onChange={handleChange} />
            <TextField type='text' sx={{ width: "300px", marginLeft: "50px" }} id="outlined-basic" name='title' label="ADD TITLE" variant="outlined" value={values.title} onChange={handleChange} />
            <TextField type='text' sx={{ width: "300px", marginLeft: "50px" }} id="outlined-basic" name='description' label="ADD DESCRIPTION" variant="outlined" value={values.description} onChange={handleChange} />

            <Button variant="contained" type="submit" sx={{ marginLeft: "30px", height: "55px", width: "150px" }}>
              SUBMIT
            </Button>
          </form>
        </Box>

        <Box aria-label="breadcrumb" sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}>

          {blogdata.map((item) => (
            
            <Box key={item._id}>
              {item.imgURL}
              {item.title}
              {item.category}
              {item.description}
            </Box>
          ))}
        </Box>
      </Box>
    </Box >
  )
}

export default AccordionPage;
