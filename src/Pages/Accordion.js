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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


function AccordionPage() {

  const [data, setdata] = useState([]);
  const [blogdata, setblogdata] = useState([]);
  const [edit, setedit] = useState(false)
  const [values, setValues] = useState({
    imgURL: '',
    title: '',
    category: "",
    description: '',
  })


  console.log(values);
  const token = window.localStorage.getItem("auth")
  // console.log(token);


  const submit = (e) => {
    e.preventDefault();
    axios.post(` https://service.apikeeda.com/api/v1/blog`, values, {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": token
      }
    })
      .then((e) => {
        getdatablog()
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const categorytogetdata = (e) => {
    axios.get('https://service.apikeeda.com/api/v1/category', {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": token
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
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": token
      }
    })
      .then((res) => {
        console.log(res.data.data);
        setblogdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const Deletedata = (id) => {
    axios.delete(`https://service.apikeeda.com/api/v1/blog/${id}`, {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": token
      }
    })
      .then((res) => {
        getdatablog();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function editdata(id) {
    axios.patch(`https://service.apikeeda.com/api/v1/blog/${edit}`, values, {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": token
      }
    })
      .then((res) => {
        setedit(false)
        setValues({
          imgURL: "",
          title: "",
          category: "",
          description: "",
        })
        getdatablog();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function search(e) {
    axios.get(`https://service.apikeeda.com/api/v1/blog/search?search=${e}`, {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": token
      }
    })
      .then((res) => {
        console.log(res.data.data);
        setblogdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function findcatogray(id) {
    // const id="66cedf0b5c856e3754b2ef22"
    var a = data.find((a) => a._id == id);
    return a.name
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

  const handlefor = (item) => {
    setValues({
      imgURL: item.imgURL,
      title: item.title,
      category: item.category,
      description:

        item.description,
    })
  }


  useState(() => {
    getdatablog();
    categorytogetdata();
  }, []);

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
        <TextField type='text' sx={{ width: "250px", display: "flex", marginLeft: "100px" }} id="outlined-basic" name='search' label="search" variant="outlined" onChange={(e) => search(e.target.value)} />
      </Breadcrumbs>

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

          <Button variant="contained" type="submit" sx={{ marginLeft: "30px", height: "55px", width: "150px" }} onClick={(e) => { edit ? editdata(e) : submit(e) }}>
            SUBMIT
          </Button>
        </Box>

        <br></br>
        <br></br>
        <Box>
          <Box aria-label="breadcrumb" sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
            {blogdata.map((item) => (
              <Box key={item._id}>
                <Card sx={{ maxWidth: 320, maxHeight: 900, margin: "20px", border: 'ridge', backgroundColor:'lightgreen ' }} >

                  <Typography>
                    <img style={{ border: 'ridge', width: 320, height: '400px' }} src={item.imgURL} />
                  </Typography>

                  <Typography variant="h5" style={{ textAlign: 'center', color: 'black'}} >
                    {item.title}
                  </Typography>

                  <Typography style={{ color: 'black', textIndent: '30px', fontSize: '17px', fontFamily: 'inherit', paddingLeft: '10px', marginTop: '15px', marginBottom: '15px' }} >
                    {item.description}
                  </Typography>


                  <Box sx={{ marginBottom: '15px', }}>
                    <Typography fontSize={15}>
                      <Button variant="text">
                        {findcatogray(item.category)}
                      </Button>

                        <Button variant="outlined" onClick={() => Deletedata(item._id)} startIcon={<DeleteIcon />} sx={{marginLeft:'20px'}}>
                          Delete
                        </Button>

                        <Button variant="outlined" onClick={() => {
                          setedit(item._id)
                          handlefor(item)
                        }} startIcon={<editIcon />} sx={{marginLeft:'20px'}}  >
                          Edit
                        </Button>

                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box >
    </Box >


  )
}

export default AccordionPage;
