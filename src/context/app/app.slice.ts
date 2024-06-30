/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorMode, SnackbarControlsInterface } from 'interfaces';

export interface AppState {
    themeMode: ColorMode;
    isLoading: boolean;
    isRequestFormOpen: boolean;
    snackbar: SnackbarControlsInterface;
    isDeleteDialogOpened: boolean;
}

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const localStorageMode = (localStorage.getItem('mode') as ColorMode) || (prefersDarkMode ? 'dark' : 'light');

const initialState: AppState = {
    themeMode: localStorageMode,
    isLoading: false,
    isRequestFormOpen: false,
    snackbar: { isOpen: false, message: '', severity: 'success' },
    isDeleteDialogOpened: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
        setTheme: (state, action: PayloadAction<ColorMode>) => {
            state.themeMode = action.payload;
            localStorage.setItem('mode', action.payload);
        },
        toggleForm: (state) => {
            state.isRequestFormOpen = !state.isRequestFormOpen;
        },
        toggleTheme: (state) => {
            const newMode = state.themeMode === 'light' ? 'dark' : 'light';
            state.themeMode = newMode;
            localStorage.setItem('mode', newMode);
        },
        setSnackbar: (state, action: PayloadAction<SnackbarControlsInterface>) => {
            state.snackbar = action.payload;
        },
        closeSnackbar: (state) => {
            state.snackbar = { isOpen: false, message: '', severity: 'success' };
        },
        showDeleteDialog: (state) => {
            state.isDeleteDialogOpened = true;
        },
        hideDeleteDialog: (state) => {
            state.isDeleteDialogOpened = false;
        },
    },
});

export const { showLoading, hideLoading, setTheme, toggleForm, toggleTheme, setSnackbar, closeSnackbar, showDeleteDialog, hideDeleteDialog } =
    appSlice.actions;
export const appReducer = appSlice.reducer;
