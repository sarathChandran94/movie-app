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


const Admin = () => {

    const [users, setUsers] = useState([]);
    let location = useLocation()
    console.log(location)

    useEffect(() => {
        axios.get('http://localhost:5000/register/admin', { headers: { 'Authorization': `Bearer ${location.state}`}})
            .then((res) => {
                console.log(res.data)
                setUsers(res.data.result)
            }).catch(e => console.log(e))

        }, [])
        console.log(users)
    const createData = (username, email, password, type, date_joined) => {
        return {username, email, password, type, date_joined};
    }
    const rows = [
        users.map((user) => {
            return createData(user.username, user.email,user.password, user.role, user.joined)
        }),
    //   createData('testuse2', 'email2', 'type2', 'date2'),
    //   createData('testuser3', 'email3', 'type3', 'date3'),
    //   createData('testuser4', 'email4', 'type4', 'date4'),
    //   createData('testuser5', 'email5', 'type5', 'date5'),
    ];
    console.log(rows)
    return (
        <>
            <h1>Admin page</h1>
            <div>
                <TableContainer style={{backgroundColor: 'darkgray'}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Password</TableCell>
                        <TableCell align="center">Account Type</TableCell>
                        <TableCell align="center">Date Joined</TableCell>
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

            </div>
        </>
    );
}

export default Admin;
