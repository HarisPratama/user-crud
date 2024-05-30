import { User } from '../../interfaces/user';
import { Dispatch } from 'redux';
import { Alert } from '../reducers/user';


export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const SET_USER_ERROR = 'SET_USER_ERROR';
export const SET_USER_LOAD = 'SET_USER_LOAD';
export const SET_ALERT = 'SET_ALERT';

interface SetUsersAction {
    type: typeof SET_USERS;
    payload: User[];
}

interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface SetUserErrorAction {
    type: typeof SET_USER_ERROR;
    payload: any;
}

interface SetUserLoadAction {
    type: typeof SET_USER_LOAD;
    payload: boolean;
}

interface SetAlertAction {
    type: typeof SET_ALERT;
    payload: Alert;
}

export type UserActionTypes =
    | SetUsersAction
    | SetUserAction
    | SetUserErrorAction
    | SetUserLoadAction
    | SetAlertAction;


export function setUsers(payload: User[]): (dispatch: Dispatch<UserActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_USERS,
            payload
        });
    };
}

export function setUser(payload: User): (dispatch: Dispatch<UserActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload
        });
    };
}

export function setUserError(payload: any): (dispatch: Dispatch<UserActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_USER_ERROR,
            payload
        });
    };
}

export function setUserLoad(payload: boolean): (dispatch: Dispatch<UserActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_USER_LOAD,
            payload
        });
    };
}

export function setAlert(payload: Alert): (dispatch: Dispatch<UserActionTypes>) => void {
    return (dispatch) => {
        dispatch({
            type: SET_ALERT,
            payload
        });
    };
}
