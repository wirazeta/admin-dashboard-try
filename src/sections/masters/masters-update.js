import {useState} from 'react';
import{
    Box,
    Button,
    FormControlLabel,
    Typography,
    TextField,
    Modal,
    Checkbox
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

export const MastersUpdate = ({master, openModal, setOpenModal}) => {
    const [data, setData] = useState({name: master.name, simNumber: master.simNumber, userId: master.userId});
    const [userId, setUserId] = useState();
    const [disable, setDisable] = useState(true);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(data);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleCheckBox = (event) => {
        if(event.target.checked === true){
            setDisable(false);
            setData({userId: null});
        }else{
            setDisable(true);
            setData({userId:master.userId});
        }
    }

    const handleSubmit = async () => {
        console.log(data);
        instance({
            url: `/masters/${master.id}`,
            method: "patch",
            data: data
        }).then((response) => {
            console.log(response);
        });
    }

    return(
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form autoComplete='off'>
                        <h2>Update Master</h2>
                        <TextField
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.name}
                        />
                        <TextField
                            name="simNumber"
                            label="Sim Number"
                            onChange={handleChange}
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.address}
                        />
                        {/* <FormControlLabel control={<Checkbox name="userIdNull" onChange={handleUserId}/>} label="Null" /> */}
                        <FormControlLabel control={<Checkbox name="userId" onChange={handleCheckBox}/>} label="Update User ID (Checked = Null)" />
                        <TextField
                            name="userId"
                            placeholder="User ID"
                            disabled={disable}
                            onChange={handleChange}
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            // value={data.userId}
                        />
                        <Button variant='outlined' color='secondary' onClick={handleSubmit} sx={{ mb : 3 }}>Update</Button>
                    </form>
                </Box>
            </Modal>
    )
}