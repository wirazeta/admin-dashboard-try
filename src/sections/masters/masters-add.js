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

export const MastersAdd = (props) => {
    const [data, setData] = useState({});
    // const [closeModal, setCloseModal] = useState(true);
    // const [file, setFile] = useState(undefined);
    // const handleClose = () => {
    //     setCloseModal(false);
    // }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(data);
    }

    const handleSubmit = () => {

        axios({
            method: 'post',
            url: "http://www.devel-filkomub.site/masters",
            data: data,
            headers: {
                "Authorization": "Bearer c55395c467dc5f4d8caee3d6b53c5f17d4c24b28976bcf387f1b9feb563e",
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error.log(error);
        })

        // instance({
        //     url: '/ponds',
        //     method:'post',
        //     body: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        // }).then((response) => {
        //     console.log(response);
        // });
    };

    return(
        <div>
            <Modal
                open={props.setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <h2>Add Master</h2>
                        <TextField
                            name="id"
                            label="Master ID"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.id}
                        />
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
                            name="simNum"
                            label="Sim Number"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.simNum}
                        />
                        <Button variant='outlined' color='secondary' type='submit' sx={{ mb : 3 }}>Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

MastersAdd.propTypes = {
    setOpen: PropTypes.bool,
};