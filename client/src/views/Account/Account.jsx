import React, { useEffect, useRef } from 'react';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as authActions from '../../redux/actions/authAction';
import { ContainerAccount, ContainerAvatar } from './StyledAccount';
import { Divider, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Account = () => {
    const selector = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const [urlFile, setUrlFile] = useState();
    const [file, setFile] = useState();
    const [modeEditUser, setModeEditUser] = useState(false)
	const [modeEditPass, setModeEditPass] = useState(false)
    const [inputUser, setInputUser] = useState({
        name: selector.isAuthenticated ? selector.user.Name : '',
        last: selector.isAuthenticated ? selector.user.Last : '',
    })

    const handleFile = file => {
        setFile(file);
        setUrlFile(URL.createObjectURL(file));
    }

    const handleUpdateUser = event => {
        event.preventDefault();

        if(inputUser.name !== selector.user.Name || inputUser.last !== selector.user.Last) {
            dispatch(authActions.updateUserAction(inputUser.name, inputUser.last))
        }

        if(file && urlFile) {
            const formData = new FormData();
            formData.append("avatar", file)
            dispatch(authActions.updateAvatarAction(formData))
            setUrlFile(undefined)
            setFile(undefined)
        }
        setModeEditUser(false)
    }

    const handleSetEditModeUser = () => {
		setModeEditUser(!modeEditUser)
		setModeEditPass(false)
	}

    const handleSetEditModePass = () => {
		setModeEditPass(!modeEditPass)
		setModeEditUser(false)
	}

    const handleInput = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value
        })
    }

    return(<>
        <Container maxWidth="lg">
            <Grid container spacing={0} direction={"column"} alignItems="center" marginTop={"30px"}>
                <Card sx={{ minWidth: 800, maxWidth: 1000 }}>
                    <div style={{width: "100%", textAlign: "center"}}>
                    </div>
                    <CardContent style={{textAlign: "center"}}>
                        <ContainerAvatar>
                            <Avatar
                                alt={selector.user.Name}
                                src={selector.user.Avatar}
                                sx={{width: 100, height: 100}}
                            />
                            <h1>
                                {selector.user.Name} {selector.user.Last}
                            </h1>
                        </ContainerAvatar>
                        <Divider/>
                        <ContainerAccount>
                            <div className='information'>
                                <div className='title'>
                                    <h2>Información general</h2>
                                    <Fab onClick={() => handleSetEditModeUser()} size={'small'} sx={{color: '#592519'}}>
                                        <EditIcon color={'black'} />
                                    </Fab>
                                </div>
                                <TextField id="filled-basic" name='name' onChange={handleInput} label="Nombre" defaultValue={selector.user.Name} value={inputUser.name} disabled={!modeEditUser}  variant="filled" />
                                <br />
                                <br />
                                <TextField id="filled-basic" name='last' onChange={handleInput} label="Apellido" defaultValue={selector.user.Last} value={inputUser.last} disabled={!modeEditUser} variant="filled" />
                                <br />
                                <br />
                                <div className='upload'>
                                    <div className='content'>
                                        <img src={!file ? selector.user.Avatar : urlFile} alt={selector.user.Name} />
                                        <FileUploader file={file} disabled={!modeEditUser} handleFile={handleFile} />
                                    </div>
                                </div>
                                <br />
                                <Button onClick={handleUpdateUser} disabled={!modeEditUser} variant="contained" color='warning'>Actualizar</Button>
                            </div>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <div className='password'>
                                <div className='title'>
                                    <h2>Cambiar contraseña</h2>
                                    <Fab onClick={() => handleSetEditModePass()} size={'small'} sx={{color: '#592519'}}>
                                        <EditIcon color={'black'} />
                                    </Fab>
                                </div>
                                <TextField id="filled-basic" label="Contraseña actual" disabled={!modeEditPass} variant="filled" />
                                <br />
                                <br />
                                <TextField id="filled-basic" label="Contraseña nueva" disabled={!modeEditPass} variant="filled" />
                                <br />
                                <br />
                                <TextField id="filled-basic" label="Repetir contraseña nueva" disabled={!modeEditPass} variant="filled" />
                                <br />
                                <br />
                                <Button variant="contained" color='warning' disabled={!modeEditPass}>Actualizar</Button>
                            </div>
                        </ContainerAccount>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    </>)
}

const FileUploader = ({handleFile, disabled, file}) => {
    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click()
    }

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    }

    return (
        <>
            <Button className="button-upload" variant="outlined" disabled={disabled} color={file ? "success" : "primary"} onClick={handleClick} endIcon={<CloudUploadIcon />}>Adjuntar imagen</Button>
            <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
            />
        </>
    );
}

export default Account;