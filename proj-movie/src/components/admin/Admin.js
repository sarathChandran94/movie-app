import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Snackbar, Box, InputLabel, MenuItem, FormControl,Select } from '@mui/material';
import { DeleteOutlineRounded } from '@material-ui/icons'
import { EditRounded } from '@material-ui/icons';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


const Admin = () => {

    const [users, setUsers] = useState([]);
    const [delMsg, setDelMsg] = useState('');
    const [editMsg, setEditMsg] = useState('');
    const [editedId, setEditedId] = useState({})
    const [editedRole, setEditedRole] = useState('')
    const [isMsg, setIsMsg] = useState(false);
    const [open, setOpen] = useState(false);
    let location = useLocation()

    const deleteHandler = (item) => {
        console.log(item)
        axios.post(`http://localhost:5000/register/admin/deleteUser/${item}`)
            .then(res => {
                setIsMsg(true)
                setDelMsg(res.data.msg)
                console.log(res)
            })
            .catch(e => console.log(e.message))

    }

    const handleChange = (e) => {
        e.preventDefault()
        // setEditedRole(e.target.value)
        // console.log(e)
        // console.log(editedItem)
        // console.log(editedRole)
        axios.post(`http://localhost:5000/register/admin/editUser/${editedId.id}`, { role: e.target.value })
            .then(result => {
                // console.log(result)
                setIsMsg(true)
                setEditMsg(result.data.msg)
            })
            .catch(e => console.log(e))
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

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

    const RoleModal = () => {
        return (
            <>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=''
                                        label="Role"
                                        onChange={handleChange}
                                        >
                                        <MenuItem value={'Admin'}>Admin</MenuItem>
                                        <MenuItem value={'User'}>User</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                </>
        )
    }

    const editHandler = (item) => {
        // console.log(item)
        setEditedId(item)
        setOpen(true)

    }

    const renderEditButton = (params) => {
        return (
            <Button
                variant='contained'
                size='small'
                color='warning'
                onClick={() => editHandler({ id: params.row.id }) }
            ><EditRounded /></Button>
        )
    }

    const renderDelButton = (params) => {
        // console.log(params)
        return (
            <Button
                variant='contained'
                size='small'
                color='error'
                onClick={ () => deleteHandler(params.row.id) }
            ><DeleteOutlineRounded /></Button>
        )
    }

    const myrows = [
        users.map((user) => {
            return {
                id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
                joined: user.joined,
            }
        })
    ];

    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
            disableClickEventBubbling: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            disableClickEventBubbling: true,
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 500,
            disableClickEventBubbling: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 200,
            disableClickEventBubbling: true,
        },
        {
            field: 'joined',
            headerName: 'Joined',
            width: 200,
            disableClickEventBubbling: true,
        },
        {
            field: 'editButton',
            headerName: 'Edit',
            renderCell: renderEditButton,
            disableClickEventBubbling: true,

        },
        {
            field: 'delButton',
            headerName: 'Delete',
            renderCell: renderDelButton,
            disableClickEventBubbling: true,

        },
    ];


    useEffect(() => {
        setEditedRole(editedRole)
        console.log(editedRole)
        axios.get('http://localhost:5000/register/admin', { headers: { 'Authorization': `Bearer ${location.state}`}})
            .then((res) => {
                // console.log(res.data)
                setUsers(res.data.result)
                // console.log(users)
            }).catch(e => console.log(e))
    }, [isMsg,editedRole])



    // console.log(rows)
    return (
        <>
            <h1>Admin page</h1>
            {open && <RoleModal />}
            <div>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        style={{ backgroundColor: 'lightgray' }}
                        rows={myrows[0]}
                        columns={columns}
                    />
                </div>
                {isMsg &&
                    <>
                        <Snackbar
                            open={isMsg}
                            onClose={() => { setIsMsg(false) }}>
                            <Alert >
                                {delMsg || editMsg}
                            </Alert>
                        </Snackbar>
                    </>
                }
            </div>
        </>
    );
}

export default Admin;
