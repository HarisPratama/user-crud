// src/components/UserForm.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { UserState, addUser, fetchingUser, updatingUser } from '../store/reducers/user';
import { User } from '../interfaces/user';

type UserFormProps = {
  userId?: string;
};

const UserForm: React.FC<UserFormProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector((state: {user: UserState}) => state.user);


    const [user, setUser] = useState<User>({
        name: '',
        avatar: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (userId) {
            dispatch(fetchingUser(userId))
        }
    }, [userId]);


    useEffect(() => {
        if (userId && userState.user?.id) {
            setUser(userState.user)
        }
    }, [userState.user, userId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userId) {
            dispatch(updatingUser(user))
        } else {
            dispatch(addUser(user))
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4 space-y-4">
        <div>
            <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            />
        </div>
        <div>
            <TextField
            label="Avatar URL"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            />
        </div>
        <div>
            <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            />
        </div>
        <div>
            <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
            {userId ? 'Update' : 'Create'} User
        </Button>
        </form>
    );
};

export default UserForm;
