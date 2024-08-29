import * as React from 'react';
import { Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl, FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



// let val = '';

const Register = () => {

    //Show/hide Password
    const [showPassword, setShowPassword] = React.useState(false);

    // const history = useHistory()

    const [values, setValues] = React.useState({
        name: '',
        email: '',
        password: ''
    });

    const history = useHistory();

    const handlechange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const [visibale] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const handleMouseDownPassword = (event) => {
        // event.preventDefault();

        // val = event.target.value;
        // console.log(val);
        // console.log(val.length);

        setValues(event.target.value);
        // console.log(event.target.value);
        // console.log(values.length);
        // console.log(values);

        // setVisibale((values.length !== 0) ? true : false);
        // setVisibale((val.length !== 0) ? true : false);

    };

    const submit = (e) => {
        console.log(values);
        e.preventDefault()
        axios.post('https://service.apikeeda.com/api/v1/user/signup', values, {
            headers: {
                "x-apikeeda-key": "c1724833279307ydh362133412xu"
            }
        })
            .then((res) => {
                console.log(res);
                localStorage.setItem('auth', res.data.authorization)
                history.push('/login')
            })
            .catch((err) => {
                console.log(err);
            })
    }


    // console.log(values);
    // console.log(values.length);

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Grid container justifyContent="center" padding="50px 0px">
                    <Grid item sm={8} xs={12}>
                        <Box textAlign="center" paddingBottom="18px">
                            <Typography component="a" href='#Ggf' sx={{ textDecoration: "none", display: "inline-block" }}>
                                <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                                    <img
                                        src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/logo.png"
                                        alt="NiceAdminlogo"
                                        width="25px"
                                        height="25px"
                                    />
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        className='nunito-sans'
                                        fontWeight={700}
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', md: 'flex' },
                                            fontFamily: '"Nunito", sans-serif',
                                            fontSize: "24px",
                                            color: "#012970",
                                            textDecoration: 'none',
                                        }}
                                    >
                                        NiceAdmin
                                    </Typography>
                                </Stack>
                            </Typography>
                        </Box>
                        <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                            <CardContent sx={{ padding: "30px 20px" }}>
                                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" className='nunito-sans' color="#012970" >
                                    Create an Account
                                </Typography>
                                <Typography variant="body2" textAlign="center" marginBottom="22px">
                                    Enter your personal details to create account
                                </Typography>
                                <Stack spacing={2}>
                                    <form onSubmit={submit}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }} >Your Name</FormLabel>
                                            <TextField type='text' id="name" size='small' name='name' value={values.name}
                                                onChange={handlechange} />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }} >Your Email</FormLabel>
                                            <TextField type='email' id='email' size='small' name='email' value={values.email}
                                                onChange={handlechange} />
                                        </FormControl>
                                        {/* <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }} >Username</FormLabel>
                                            <TextField type='text' size='small' 
                                              value={values.password}
                                              onChange={handlechange} />
                                        </FormControl> */}
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }} >Password</FormLabel>
                                            <OutlinedInput
                                                value={values.password}
                                                onChange={handlechange}
                                                // onKeyUp={handleMouseDownPassword}
                                                //  onClick={handleMouseDownPassword}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    visibale ?
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                // onMouseDown={handleMouseDownPassword}                                 
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                        : ""
                                                }
                                                size='small'
                                                id='password'
                                                name='password'
                                            />
                                        </FormControl>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox disableRipple />
                                            <Typography>
                                                I agree and accept the
                                                <a href='#hh' style={{ color: "#4154f1", textDecoration: "none" }}> terms and conditions</a>
                                            </Typography>
                                        </Stack>
                                        <Button type='submit' variant="contained" sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#0d6efd" }} >
                                            Create Account
                                        </Button>
                                        <Typography>
                                            Already have an account?
                                            <Typography component="a" href='#ff' color="#4154f1" sx={{ textDecoration: "none" }}> Log in</Typography>
                                        </Typography>
                                    </form>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Register;