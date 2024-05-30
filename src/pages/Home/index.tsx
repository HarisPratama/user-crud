import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Pagination } from '@mui/material';

import { UserState, deletingUser, fetchingUsers } from '../../store/reducers/user';
import { AppDispatch } from '../../store';
import BasicTableUser from '../../components/BasictableUser';
import { User } from '../../interfaces/user';
import DialogComponent from '../../components/Dialog';
import UserForm from '../../components/UserForm';
import { useAlert } from '../../components/AlertContext';
import { useLoading } from '../../components/LoadingContext';
import { Add } from '@mui/icons-material';

const Home = () => {
    const showAlert = useAlert();
    const { setLoading } = useLoading();

    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: {user: UserState}) => state.user.users);
    const alert = useSelector((state: {user: UserState}) => state.user.alert);
    const loading = useSelector((state: {user: UserState}) => state.user.loading);
    const totalData = useSelector((state: {user: UserState}) => state.user.total);

    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [open, setOpen] = useState(false)
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        dispatch(fetchingUsers())
    }, [])

    useEffect(() => {
        if (alert.showAlert) {
            handleClose()
            showAlert(alert.text, alert.title || 'error');
        }
        setLoading(loading)
    }, [alert.showAlert, loading])

    const openModal = () => {
        setOpen(true)
        setSelectedUser(null)
    }

    const selectUser = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    }

    const deleteUser = (user: User) => {
        if (user.id) dispatch(deletingUser(user.id))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        dispatch(fetchingUsers(value))
    }

    return (
        <div className='container mx-auto px-4 py-4'>
            <Button variant="outlined" startIcon={<Add/>} onClick={openModal}>Add User</Button>
            <div className="py-4">
                <BasicTableUser rows={users} selectUser={selectUser} deleteUser={deleteUser}/>
                <Pagination count={totalData} color="primary" className='py-4' page={page} onChange={handlePageChange} />
            </div>
            <DialogComponent
                selectedUser={selectedUser}
                open={open}
                onClose={handleClose}
                dialogTitle="Form User"
            >
                <UserForm userId={selectedUser?.id}/>
            </DialogComponent>
        </div>
    );
}

export default Home;
