import { useState } from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    TextField,
    Modal,
    Grid,
    Checkbox,
    Select,
    Switch,
    MenuItem,
    FormControl
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { instance } from 'src/hooks/use-api';

const modalStyle = theme => ({
    modalStyle1:{
        position:'absolute',
        top:'10%',
        left:'10%',
        overflow:'scroll',
        height:'100%',
        display:'block'
    }
});

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

let users = [];
let masters = [];

instance({
    url: '/users',
    method: 'get'
}).then((response) => {
    response.data.map((user) => {
        users.push(user);
    })
}).catch((err) => {
    console.log(err);
});

instance({
    url: '/masters',
    method: 'get'
}).then((response) => {
    response.data.map((master) => {
        masters.push(master);
    });
});

export const DevicesUpdate = ({ device, openModal, setOpenModal }) => {
    const [data, setData] = useState({
        name: device.name,
        notificationEnabled: device.notificationEnabled,
        tempLow: device.tempLow,
        tempHigh: device.tempHigh,
        phLow: device.phLow,
        phHigh: device.phHigh,
        tdoLow: device.tdoLow,
        tdoHigh: device.tdoHigh,
        tdsLow: device.tdsLow,
        tdsHigh: device.tdsHigh,
        turbiditiesLow: device.turbiditiesLow,
        turbiditiesHigh: device.turbiditiesHigh,
        userId: device.userId,
        masterId: device.masterId
    });
    const [disable, setDisable] = useState(true);
    const handleChange = (event) => {
        const { name, value } = event.target;
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
        const { name } = event.target;
        const { } = device;
        if (event.target.checked === true) {
            setDisable(false);
            setData({ [event.target.name]: null });
        } else {
            setDisable(true);
            setData({ [name]: device });
        }
    }

    const handleSubmit = async () => {
        console.log(data);
        instance({
            url: `/devices/${device.id}`,
            method: "patch",
            data: data
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <Scrollbar>
            <Modal
                open={openModal}
                onClose={handleClose}
                className={modalStyle.modalStyle1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <form autoComplete='off'>
                            <h2>Update Master</h2>
                            <Grid item xs={6}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    onChange={handleChange}
                                    variant='outlined'
                                    color='secondary'
                                    type='text'
                                    sx={{ mb: 3 }}
                                    fullWidth
                                    value={data.name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Switch
                                    name="notificationEnabled"
                                    label="Notification"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="tempLow"
                                    label="Temp Low"
                                    onChange={handleChange}
                                    variant='outlined'
                                    color='secondary'
                                    type='number'
                                    sx={{ mb: 3 }}
                                    fullWidth
                                    value={data.tempLow}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="tempHigh"
                                    label="Temp High"
                                    onChange={handleChange}
                                    variant='outlined'
                                    color='secondary'
                                    type='number'
                                    sx={{ mb: 3 }}
                                    fullWidth
                                    value={data.tempHigh}
                                />
                            </Grid>
                            <TextField
                                name="phLow"
                                label="pH Low"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.phLow}
                            />
                            <TextField
                                name="phHigh"
                                label="pH High"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.phHigh}
                            />
                            <TextField
                                name="tdoLow"
                                label="TDO Low"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.tdoLow}
                            />
                            <TextField
                                name="tdoHigh"
                                label="TDO High"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.tdoHigh}
                            />
                            <TextField
                                name="tdsLow"
                                label="TDS Low"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.tdsLow}
                            />
                            <TextField
                                name="tdsHigh"
                                label="TDS High"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.tdsHigh}
                            />
                            <TextField
                                name="turbiditiesLow"
                                label="Turbidities Low"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.turbiditiesLow}
                            />
                            <TextField
                                name="turbiditiesHigh"
                                label="Turbidities High"
                                onChange={handleChange}
                                variant='outlined'
                                color='secondary'
                                type='number'
                                sx={{ mb: 3 }}
                                fullWidth
                                value={data.turbiditiesHigh}
                            />
                            <FormControl sx={{ mb: 3 }} fullWidth>
                                <Select
                                    id="user-select"
                                    name="userId"
                                    autoWidth
                                    disabled={disable}
                                    onChange={handleChange}
                                >
                                    {
                                        users.map((user) => {
                                            return (
                                                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                                            )
                                        })
                                    }
                                    <MenuItem value={null}>Null</MenuItem>
                                </Select>
                                <Select
                                    id="user-select"
                                    name="masterId"
                                    autoWidth
                                    disabled={disable}
                                    onChange={handleChange}
                                >
                                    {
                                        masters.map((master) => {
                                            return (
                                                <MenuItem key={master.id} value={master.id}>{master.name}</MenuItem>
                                            )
                                        })
                                    }
                                    <MenuItem value={null}>Null</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant='outlined' color='secondary' onClick={handleSubmit} sx={{ mb: 3 }} type='submit'>Update</Button>
                        </form>
                    </Grid>
                </Box>
            </Modal>
        </Scrollbar>
    )
}