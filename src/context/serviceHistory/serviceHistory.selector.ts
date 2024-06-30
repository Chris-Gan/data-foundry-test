/* eslint-disable import/prefer-default-export */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'interfaces';

export const selectServiceRequestForm = createSelector(
    (rootState: RootState) => rootState.serviceHistory.serviceRequestForm,
    (serviceRequestForm) => serviceRequestForm
);

export const selectCurrentEditedRequest = createSelector(
    (rootState: RootState) => rootState.serviceHistory.editedRequestCurrentValues,
    (editedRequestCurrentValues) => editedRequestCurrentValues
);

export const selectIsEditingMode = createSelector(
    (rootState: RootState) => rootState.serviceHistory.editedRequestCurrentValues,
    (editedRequestCurrentValues) => !!editedRequestCurrentValues
);
