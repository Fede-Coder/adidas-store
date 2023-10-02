import React from 'react';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Logo from '../../img/logo.png'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import * as authActions from '../../redux/actions/authAction';

const Login = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
    })

    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(authActions.loginUserAction(input.email, input.password))
        navigate('/')
    }

    return(<>
        <Container maxWidth="lg">
            <Grid container spacing={0} direction={"column"} alignItems="center" justifyContent="center"  sx={{ minHeight: '100vh' }}>
                <Card sx={{ minWidth: 400, maxWidth: 400 }}>
                    <div style={{width: "100%", textAlign: "center"}}>                        
                        <img src={Logo} alt='logo' width={200} />
                    </div>
                    <CardContent style={{textAlign: "center"}}>
                        <Typography gutterBottom variant="h5" component="div">
                        Iniciar cuenta
                        </Typography>
                        <TextField name='email' value={input.email} onChange={handleInput} fullWidth id="filled-basic" label="Email" variant="filled" />
                        <TextField name='password' value={input.password} onChange={handleInput} type='password' fullWidth id="filled-basic" label="Contraseña" variant="filled" />
                    </CardContent>
                    <CardActions>
                        <div style={{width: "100%", textAlign: "center"}}>
                            <Button onClick={handleOnSubmit}  variant="contained" size="large">Iniciar sesion</Button>
                            <Link to={'/register'}>
                                <Button color="secondary" variant="contained" size="large">Registrar</Button>
                            </Link>
                        </div>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
    </>)
}

export default Login;