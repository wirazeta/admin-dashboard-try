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

export const ArticlesAdd = ({isOpen, setOpen}) => {
    const [data, setData] = useState({title: "", url: "", image: ""});
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(data);
    }

    const handleSubmit = () => {

        instance({
            url: '/articles',
            method:'post',
            data: data,
        }).then((response) => {
            console.log(response);
        });
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
                        <h2>Add Articles</h2>
                        <TextField
                            name="title"
                            label="Title"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.title}
                        />
                        <TextField
                            name="url"
                            label="URL"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.url}
                        /><TextField
                            name="image"
                            label="Image"
                            onChange={handleChange}
                            required
                            variant='outlined'
                            color='secondary'
                            type='text'
                            sx={{mb: 3}}
                            fullWidth
                            value={data.image}
                        />
                        <Button variant='outlined' color='secondary' onClick={handleSubmit} sx={{ mb : 3 }}>Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}