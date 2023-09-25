import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    InputLabel,
    TextField,
    Modal,
    Select,
    Switch,
    MenuItem,
    FormControl
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { instance } from 'src/hooks/use-api';
const style = {
    position: 'absolute',
    top: '85%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const DevicesUpdate = ({ device, openModal, setOpenModal, fetchDevices }) => {
    const [data, setData] = useState({
        // name: device.name,
        // notificationEnabled: device.notificationEnabled,
        // tempLow: device.tempLow,
        // tempHigh: device.tempHigh,
        // phLow: device.phLow,
        // phHigh: device.phHigh,
        // tdoLow: device.tdoLow,
        // tdoHigh: device.tdoHigh,
        // tdsLow: device.tdsLow,
        // tdsHigh: device.tdsHigh,
        // turbiditiesLow: device.turbiditiesLow,
        // turbiditiesHigh: device.turbiditiesHigh,
        // userId: device.userId,
        // masterId: device.masterId
    });
    const [users, setUser] = useState([]);
    const [masters, setMaster] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseUser = await instance.get('/users');
            const responseMaster = await instance.get('/masters');

            setUser(responseUser.data);
            setMaster(responseMaster.data);
        }
        fetchData();
    },[]);

    console.log(users);
    console.log(masters);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`${name} : ${value}`);
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(data);
    }

    const handleSwitch = (event) => {
        if (event.target.checked === true) {
            setData({ notificationEnabled: 1 });
        } else {
            setData({ notificationEnabled: 0 });
        }
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleSubmit = async () => {
        console.log(data);
        await instance({
            method: 'patch',
            url: `/devices/${device.id}`,
            data: data
        }).then((response) => {
            console.log(response);
            setOpenModal(false);
            fetchDevices();
        });
    }

    return (
        <Scrollbar>
            <Modal
                open={openModal}
                onClose={handleClose}
                style={{ overflow: 'scroll' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <h2>Update Master</h2>
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
                        <FormControl>
                            <FormControlLabel
                                control={<Switch onChange={handleSwitch} />}
                                label="Notification"
                                sx={{ mb: 3 }}
                            />
                        </FormControl>
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-sample-select-label">User</InputLabel>
                            <Select
                                id="user-select"
                                name="userId"
                                label="User"
                                onChange={handleChange}
                                value={data.userId}
                                sx={{ mb: 3 }}
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
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-sample-select-label">Master</InputLabel>
                            <Select
                                id="user-select"
                                name="masterId"
                                label="Master"
                                onChange={handleChange}
                                value={data.masterId}
                                sx={{ mb: 3 }}
                            >
                                {
                                    masters.map((master) => {
                                        console.log(master);
                                        return (
                                            <MenuItem key={master.id} value={master.id}>{master.name}</MenuItem>
                                        )
                                    })
                                }
                                <MenuItem value={null}>Null</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant='outlined' color='secondary' onClick={handleSubmit} sx={{ mb: 3 }}>Update</Button>
                    </form>
                </Box>
            </Modal>
        </Scrollbar>
    )
}