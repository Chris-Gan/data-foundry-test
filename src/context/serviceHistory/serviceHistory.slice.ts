/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { requestServiceFormInitValues } from 'constants/index';
import { ServiceHistoryInterface, ServiceRequestFormInterface } from 'interfaces';

export interface ServiceHistoryState {
    serviceRequestForm: ServiceRequestFormInterface;
    editedRequestCurrentValues: ServiceHistoryInterface | null;
}

const initialState: ServiceHistoryState = {
    serviceRequestForm: requestServiceFormInitValues,
    editedRequestCurrentValues: null,
};

export const serviceHistorySlice = createSlice({
    name: 'serviceHistory',
    initialState,
    reducers: {
        setServiceRequestForm: (state, action: PayloadAction<ServiceRequestFormInterface>) => {
            state.serviceRequestForm = action.payload;
        },
        setEditedRequestCurrentValues: (state, action: PayloadAction<ServiceHistoryInterface | null>) => {
            state.editedRequestCurrentValues = action.payload;
        },
    },
});

export const { setServiceRequestForm, setEditedRequestCurrentValues } = serviceHistorySlice.actions;
export const serviceHistoryReducer = serviceHistorySlice.reducer;
