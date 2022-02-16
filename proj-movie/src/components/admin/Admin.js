import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Snackbar } from '@mui/material';
import { DeleteOutlineRounded } from '@material-ui/icons'


const Admin = () => {

    const [users, setUsers] = useState([]);
    const [delMsg, setDelMsg] = useState('');
    const [isDelMsg, setIsDelMsg] = useState(false);
    let location = useLocation()
    // console.log(location.state)



    const myrows = [
        users.map((user) => {
            return {
                id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
                joined: user.joined
            }
        })
    ];
    console.log(myrows[0])

    // const createData = (username, email, password, type, date_joined) => {
    //     return {username, email, password, type, date_joined};
    // }

    // const rows = [
    //     users.map((user) => {
    //         return createData(user.username, user.email,user.password, user.role, user.joined)
    //     }),
    // ];

    const deleteHandler = (item) => {
        console.log(item)
        axios.post(`http://localhost:5000/register/admin/${item}`)
            .then(res => {
                setIsDelMsg(true)
                setDelMsg(res.data.msg)
                console.log(res)
            })
            .catch(e => console.log(e.message))

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
            field: 'delButton',
            headerName: 'Delete',
            renderCell: renderDelButton,
            // disableClickEventBubbling: true,

        },
    ];


    useEffect(() => {
        axios.get('http://localhost:5000/register/admin', { headers: { 'Authorization': `Bearer ${location.state}`}})
            .then((res) => {
                console.log(res.data)
                setUsers(res.data.result)
                // console.log(users)
            }).catch(e => console.log(e))
    }, [isDelMsg])



    // console.log(rows)
    return (
        <>
            <h1>Admin page</h1>
            {/* <div>
                <TableContainer  style={{backgroundColor: 'darkgray'}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Password</TableCell>
                        <TableCell align="center">Account Type</TableCell>
                        <TableCell align="center">Date Joined</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows[0].map((row) => (
                        <TableRow
                        key={row.username}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.username}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.password}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">{row.date_joined}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

            </div> */}
            <div>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        style={{ backgroundColor: 'lightgray' }}
                        rows={myrows[0]}
                        columns={columns}
                        // onCellClick={() => deleteHandler(myrows[0]._id)}
                        // checkboxSelection
                    />
                </div>
                {isDelMsg &&
                    <>
                        <Snackbar open={isDelMsg} onClose={() => { setIsDelMsg(false) }}>
                            <Alert >
                                {delMsg}
                            </Alert>
                        </Snackbar>
                    </>
                }
            </div>
        </>
    );
}

export default Admin;
