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



// const blogsenddata = (e) => {
//   axios.post(` https://service.apikeeda.com/api/v1/blog`, {          //inputval
//     headers: {
//       "x-apikeeda-key": "e1724138964810axk980597553wi",
//       "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVmZjY5NWM4NTZlMzc1NGE2ZTgzYiIsImlhdCI6MTcyMzc5MzQwNSwiZXhwIjoxNzIzOTY2MjA1fQ.kT7tT3jEqR8-Yi3T9_NA-Lz7TwjFtAbMPWHFH8dYwEE"
//     }
//   })
//     .then((res) => {
//       console.log(e);
//       getdatablog();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

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


  const categorytogetdata = (e) => {
    axios.get(`https://service.apikeeda.com/api/v1/category`, {
      headers: {
        "x-apikeeda-key": "e1724138964810axk980597553wi",
        "authorization": window.localStorage.getItem("auth")
      }
    })
      .then((e) => {
        setdata(e.data.data)
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
        console.log(res.data);

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useState(() => {
    // getdatofcategory(),
    categorytogetdata();
  }, []);
  console.log(age);


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

      {/* <Box>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}


      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Movie List
        </Typography>

        <Box sx={{ display: "flex", marginLeft: "10px" }}>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">LIST</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="LIST"
              value={age}
              onChange={handleChange}
            >
              {data.map((item) =>

              (
                <MenuItem sx={{ width: "100%", textAlign: "center", fontSize: "20px" }} key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>

                // console.log(data);

              )
              )}
            </Select>
          </FormControl>
          <TextField sx={{ width: "450px", marginLeft: "90px" }} id="outlined-basic" label="ADD URL" variant="outlined" />
          <TextField sx={{ width: "450px", marginLeft: "90px" }} id="outlined-basic" label="ADD TITLE" variant="outlined" />
          <TextField sx={{ width: "400px", marginLeft: "90px" }} id="outlined-basic" label=" ADD DESCRIPTION" variant="outlined" />

          <Button variant="contained" sx={{ marginLeft: "100px", height: "50px", width: "150px" }}>
            SUBMIT
          </Button>
        </Box>

        <Box aria-label="breadcrumb" sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}>
        </Box>
      </Box>
    </Box>
  )
}

export default AccordionPage;
