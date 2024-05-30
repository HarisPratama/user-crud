import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState } from '../index';
import { setUsers, setUser, setUserLoad, setUserError, setAlert } from '../actions/user';
import { User } from '../../interfaces/user';
import env from '../../environment/env';
import axios from 'axios';


export interface Alert {
    title: 'success' | 'info' | 'warning' | 'error' | '';
    text: string;
    icon: string;
    showAlert: boolean;
}

export interface UserState {
    users: User[];
    user: User | null;
    error: any;
    loading: boolean;
    alert: Alert;
    page: number;
    limit: number;
    total: number;
}

export interface Action<T = any> {
    type: string;
    payload: T;
}

const initialState: UserState = {
    users: [],
    user: null,
    error: null,
    loading: false,
    alert: {
        title: "",
        text: "",
        icon: "",
        showAlert: false
    },
    page:1,
    limit: 10,
    total: 0,
};

export default function userReducer(state: UserState = initialState, action: Action): UserState {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_USER_ERROR':
            return { ...state, error: action.payload };
        case 'SET_USER_LOAD':
            return { ...state, loading: action.payload };
        case 'SET_ALERT':
            return { ...state, alert: { ...state.alert, ...action.payload } };
        case 'SET_PAGINATION':
            return { ...state, page: action.payload.page, limit: action.payload.limit, total: action.payload.total };
        default:
            return state;
    }
}


type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;


export const fetchingUsers = (page: number = 1, limit: number = 10): AppThunk => async (dispatch) => {
    dispatch(setUserLoad(true));
    try {
        const getData = await axios.get(env.apiUrl, {
            params: {
                page,
                limit
            }
        })
        const getDataTotal = await axios.get(env.apiUrl);

        if (getData.data) {
            dispatch(setUsers(getData.data));
            dispatch({
                type: 'SET_PAGINATION',
                payload: {page, limit, total: Math.ceil(getDataTotal.data?.length / 10) || 0}
            });
        } else {
            throw getData;
        }
    } catch (error) {
        dispatch(setUserError(JSON.stringify(error)));
    } finally {
        dispatch(setUserLoad(false));
        setTimeout(() => {
            const alertPayload: Alert = {
                title: '',
                text: '',
                icon: '',
                showAlert: false
            };
            dispatch(setAlert(alertPayload))
        }, 3000)
    }
};


export const fetchingUser = (userId: string): AppThunk => async (dispatch) => {
    dispatch(setUserLoad(true));
    try {
        const getData = await axios.get(`${env.apiUrl}/${userId}`)
        if (getData.data) {
            dispatch(setUser(getData.data));
        } else {
            throw getData;
        }
    } catch (error) {
        dispatch(setUserError(JSON.stringify(error)));
    } finally {
        dispatch(setUserLoad(false));
    }
};

export const addUser = (payload: User): AppThunk => async (dispatch) => {
    dispatch(setUserLoad(true));
    try {
        const getData = await axios.post(env.apiUrl, payload)
        
        if (getData.status === 201) {
            const alertPayload: Alert = {
                title: 'success',
                text: 'Success create user',
                icon: 'success',
                showAlert: true
            };
            dispatch(setAlert(alertPayload))
            dispatch(fetchingUsers());
        } else {
            throw getData;
        }
    } catch (error) {
        const alertPayload: Alert = {
            title: 'error',
            text: 'something wrong',
            icon: 'info',
            showAlert: true
        };
        dispatch(setAlert(alertPayload))
        dispatch(setUserError(JSON.stringify(error)));
    } finally {
        dispatch(setUserLoad(false));
    }
};

export const updatingUser = (payload: User): AppThunk => async (dispatch) => {
    dispatch(setUserLoad(true));
    try {
        const getData:any = await axios.put(`${env.apiUrl}/${payload.id}`, payload);
        if (getData.status === 200) {
            const alertPayload: Alert = {
                title: 'success',
                text: 'Success update user',
                icon: 'success',
                showAlert: true
            };
            dispatch(setAlert(alertPayload))
            dispatch(fetchingUsers());
        } else {
            throw getData;
        }
    } catch (error) {
        const alertPayload: Alert = {
            title: 'error',
            text: 'something wrong',
            icon: 'info',
            showAlert: true
        };
        dispatch(setAlert(alertPayload))
        dispatch(setUserError(JSON.stringify(error)));
    } finally {
        dispatch(setUserLoad(false));
    }
};

export const deletingUser = (userId: string): AppThunk => async (dispatch) => {
    dispatch(setUserLoad(true));
    try {
        const getData = await axios.delete(`${env.apiUrl}/${userId}`);
        
        if (getData.status === 200) {
            const alertPayload: Alert = {
                title: 'success',
                text: 'Success delete user',
                icon: 'info',
                showAlert: true
            };
            dispatch(setAlert(alertPayload))
            dispatch(fetchingUsers());
        } else {
            throw getData;
        }
    } catch (error) {
        const alertPayload: Alert = {
            title: 'error',
            text: 'something wrong',
            icon: 'info',
            showAlert: true
        };
        dispatch(setAlert(alertPayload))
        dispatch(setUserError(JSON.stringify(error)));
    } finally {
        dispatch(setUserLoad(false));
    }
};