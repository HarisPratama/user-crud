import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { UserState, fetchingUser, fetchingUsers } from '../../store/reducers/user';
import { Avatar, AvatarGroup, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useLoading } from '../../components/LoadingContext';

const DetailUser = () => {
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector((state: {user: UserState}) => state.user);

    const params = useParams();

    const { setLoading } = useLoading();


    useEffect(() => {
        if (params.id) {
            dispatch(fetchingUser(params.id))
            dispatch(fetchingUsers())
        }
    }, [params.id]);

    useEffect(() => {
        setLoading(userState.loading)
    }, [userState.loading])

    return (
        <div className='flex flex-col gap-6 justify-center items-center min-h-screen text-center'>
            {userState.user?.id &&
                <div className='flex flex-col items-center gap-2'>
                    <Avatar alt={userState.user.name} src={userState.user.avatar} sx={{ width: 100, height: 100 }}/>
                    <h1>{userState.user.name}</h1>
                    <Divider/>
                    <p>Contact:</p>
                    <p>{userState.user.email}</p>
                    <p>{userState.user.phone}</p>
                </div>
            }

            {userState.users.length > 0 && 
                <div>
                    <AvatarGroup max={4}>
                        {userState.users.map((user) => (
                            <Link to={`/user/${user.id}`}>
                                <Avatar alt={user.name} src={user.avatar} />
                            </Link>
                        ))}
                    </AvatarGroup>
                </div>
            }
            
        </div>
    );
}

export default DetailUser;
