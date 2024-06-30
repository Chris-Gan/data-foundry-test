import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'interfaces';
import { appReducer } from './app';
import { serviceHistoryReducer } from './serviceHistory';

export const store = configureStore({
    reducer: {
        app: appReducer,
        serviceHistory: serviceHistoryReducer,
    },
});
export const useAppDispatch = () => useDispatch<AppDispatch>();
