import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User } from '../interfaces/user';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const BasicTableUser: React.FC<{rows: User[], selectUser: (user: User) => void, deleteUser: (user: User) => void}> = ({ rows, selectUser, deleteUser }) => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Photo</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Registered Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`user/${row.id}`}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Avatar alt={row.name} src={row.avatar} sx={{ width: 56, height: 56 }}/>
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => selectUser(row)}  className="bg-green-600 rounded-md py-1 px-4">Edit</Button>
                  <Button onClick={() => deleteUser(row)} className="bg-red-600 rounded-md py-1 px-4">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default BasicTableUser
