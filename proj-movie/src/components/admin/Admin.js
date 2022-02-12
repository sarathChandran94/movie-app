import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Admin = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/register/admin', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjIwNzQxZmIwNTc3NjljODhhNjQzNGU0IiwiaWF0IjoxNjQ0NjY0NjYyfQ.Xh4tRZX_jp3qrEX9O9-OQKXuXh4siVCTXYtwRQlGLMc'}})
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
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Password</TableCell>
                        <TableCell align="right">Account Type</TableCell>
                        <TableCell align="right">Date Joined</TableCell>
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
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.password}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.date_joined}</TableCell>
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
