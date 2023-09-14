import PropTypes from 'prop-types';
import { useState } from 'react';
import{
    Box,
    Button,
    FormControl,
    Typography,
    TextField,
    Modal
} from '@mui/material';
// import { instance } from 'src/hooks/use-api';
const axios = require('axios');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const PondsAdd = ({ isOpen, setOpen }) => {
    const [data, setData] = useState({name:"", address:"", city:"", deviceId:null});
    const [file, setFile] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(data);
    }
    
    const handleFile = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async () => {

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('city', data.city);
        if(data.deviceId !== null){
            formData.append('deviceId', data.deviceId);
        }
        formData.append('file', file);

        console.log(formData);

        console.log(data);

        await axios({
            method: 'post',
            url: "http://www.devel-filkomub.site/ponds",
            data: formData,
            headers: {
                "Authorization": "Bearer c55395c467dc5f4d8caee3d6b53c5f17d4c24b28976bcf387f1b9feb563e",
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
        console.log(axios);
    };

    return(
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form autoComplete='off'>
                        <h2>Add Pond</h2>
                        <TextField
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.name}
                        />
                        <TextField
                            name="address"
                            label="Address"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.address}
                        /><TextField
                            name="city"
                            label="City"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.city}
                        />
                        <TextField
                            name="deviceId"
                            label="Device ID"
                            onChange={handleChange}
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.deviceId}
                        />
                        <input 
                            id='file' 
                            type='file' 
                            name='file'
                            onChange={handleFile}
                            required
                            accept='image/png, image/jpg'
                        />
                        <Button variant='outlined' color='secondary' onClick={handleSubmit} sx={{ mb : 3 }}>Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
