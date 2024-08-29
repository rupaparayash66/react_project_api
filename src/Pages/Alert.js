import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, styled, Paper, Alert, Stack, AlertTitle, Breadcrumbs } from '@mui/material';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));


//Alert Types
const Severity = ["success", "info", "warning", "error"];

const AlertPage = () => {

  const [tog, settog] = useState(false)
  const [tog1, settog1] = useState(false)
  const [data, setdata] = useState([]);

  const [values, setValues] = React.useState({

    name: '',
  });


  const handlesubmit = (e) => {
    e.preventDefault();
    if (tog1) {
      axios.patch(`https://service.apikeeda.com/api/v1/category/${tog1}`, values, {
        headers: {
          "x-apikeeda-key": "c1724833279307ydh362133412xu",
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVmZjY5NWM4NTZlMzc1NGE2ZTgzYiIsImlhdCI6MTcyMzc5MzQwNSwiZXhwIjoxNzIzOTY2MjA1fQ.kT7tT3jEqR8-Yi3T9_NA-Lz7TwjFtAbMPWHFH8dYwEE"
        }
      })
        .then((res) => {
          getdata();
          console.log(res.data);
          settog1(false)
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      axios.post('https://service.apikeeda.com/api/v1/category', values, {
        headers: {
          "x-apikeeda-key": "c1724833279307ydh362133412xu",
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVmZjY5NWM4NTZlMzc1NGE2ZTgzYiIsImlhdCI6MTcyMzc5MzQwNSwiZXhwIjoxNzIzOTY2MjA1fQ.kT7tT3jEqR8-Yi3T9_NA-Lz7TwjFtAbMPWHFH8dYwEE"
        }
      })
        .then((res) => {
          getdata()
          console.log(res.data.data)
          localStorage.setItem('auth', res.data.authorization)
        })
        .catch((err) => {
          console.log(err);
        })

    }

  }

  const getdata = (e) => {
    // e.preventDefault();
    axios.get('https://service.apikeeda.com/api/v1/category', {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVmZjY5NWM4NTZlMzc1NGE2ZTgzYiIsImlhdCI6MTcyMzc5MzQwNSwiZXhwIjoxNzIzOTY2MjA1fQ.kT7tT3jEqR8-Yi3T9_NA-Lz7TwjFtAbMPWHFH8dYwEE"
      }
    })
      .then((res) => {
        console.log(res.data.data)
        setdata(res.data.data)
        // localStorage.setItem('auth', res.data.authorization) 
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getdata()
  }, []);

  const handledelete = (id) => {
    axios.delete(`https://service.apikeeda.com/api/v1/category/${id}`, {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu"
      }
    })
      .then((res) => {
        getdata();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const handlechange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }


  const handleedit = (item) => {
    axios.patch(`https://service.apikeeda.com/api/v1/category/${'id'}`, {
      headers: {
        "x-apikeeda-key": "c1724833279307ydh362133412xu"
      }
    })
      .then((res) => {
        getdata();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return (
    <Box>
      <Typography variant="h5" marginBottom="5px">
        Alerts
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
        <form></form>
        <Link className="Breadcrumb" style={{ color: "#899bbd", fontSize: "14px", textDecoration: "none" }} to="/">
          Home
        </Link>
        <Typography color="#899bbd" fontSize="14px">Components</Typography>
        <Typography color="#273246" fontSize="14px">Alerts</Typography>

        <button onClick={() => { settog(!tog) }}>+ Add category</button>
        <form action="" onSubmit={handlesubmit}>
          {tog ? <TextField id="standard-basic" type='text' name='name' label="Standard" variant="standard" value={values.name} onChange={handlechange} /> : ''}

          {tog ? <button type='submit' >submit</button> : ''}
        </form>

      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Item sx={{ padding: "20px" }}>
                <Typography variant="h6" color="#012970" fontSize="18px" marginBottom="20px" >
                  Default
                </Typography>
                <Stack spacing={2} component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                  {/* <box> */}
                  <table border={5} style={{ width: "100%", marginTop: "0px" }}>
                    {/* <tbody> */}
                    <tr>
                      <th>NO</th>
                      <th>ID</th>
                      <th>DETAILS</th>
                      <th>DELETE</th>
                      <th>UPDATE</th>
                    </tr>
                    {/* </tbody> */}
                  </table>
                  {/* </box> */}
                  {data.map((item , i) => (

                    <Box key={item._id}>
                      <table border={5} style={{ width: "100%", marginTop: "0px" }}>
                        <tr>
                          <th>{i + 1}</th>
                          <th>{item._id}</th>
                          <th>{item.name}</th>
                          <th> <Button variant="outlined" onClick={() => handledelete(item._id)} startIcon={<DeleteIcon />}>Delete </Button></th>
                          <th><Button variant="outlined" onClick={() => { setValues({ "name": item.name }); settog1(item._id) }} startIcon={<editIcon />}>Edit </Button></th>
                          <tr></tr>
                        </tr>
                      </table>
                    </Box>
                  ))}
                </Stack>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AlertPage;