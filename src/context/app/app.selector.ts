import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'interfaces';

export const selectThemeMode = createSelector(
    (rootState: RootState) => rootState.app.themeMode,
    (themeMode) => themeMode
);

export const selectLoadingState = createSelector(
    (rootState: RootState) => rootState.app.isLoading,
    (isLoading) => isLoading
);

export const selectIsFormDialogOpen = createSelector(
    (rootState: RootState) => rootState.app.isRequestFormOpen,
    (isRequestFormOpen) => isRequestFormOpen
);

export const selectSnackbar = createSelector(
    (rootState: RootState) => rootState.app.snackbar,
    (snackbar) => snackbar
);

export const selectDeleteDialogState = createSelector(
    (rootState: RootState) => rootState.app.isDeleteDialogOpened,
    (isDeleteDialogOpened) => isDeleteDialogOpened
);
