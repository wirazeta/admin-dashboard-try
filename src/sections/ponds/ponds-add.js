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
import { instance } from 'src/hooks/use-api';

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

export default function PondsAdd(props){
    const [data, setData] = useState({});
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setData({
            name: data.name,
            address: data.address,
            city: data.city,
            deviceId: data.deviceId,
            file: data.file,
        });
        instance({
            url: '/ponds',
            method:'post',
            data: data
        }).then((response) => {
            console.log(response);
        });
    };

    return(
        <div>
            <Modal
                open={props.setOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <h2>Add Pod</h2>
                        <TextField
                            label="Name"
                            onChange={setData(e.target.value)}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.name}
                        />
                        <TextField
                            label="Name"
                            onChange={setData(e.target.value)}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.address}
                        />
                        <TextField
                            label="Name"
                            onChange={setData(e.target.value)}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.city}
                        />
                        <TextField
                            label="Name"
                            onChange={setData(e.target.value)}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.deviceId}
                        />
                        
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

PondsAdd.propTypes = {
    setOpen: PropTypes.bool,
};