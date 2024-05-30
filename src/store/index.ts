import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './reducers/user';

const reducers = combineReducers({
	user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: reducers,
});

export default store;
