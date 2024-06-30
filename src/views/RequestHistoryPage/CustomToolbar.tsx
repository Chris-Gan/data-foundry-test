import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'context/store';
import { toggleForm } from 'context/app';
import { setEditedRequestCurrentValues, setServiceRequestForm } from 'context';
import { requestServiceFormInitValues } from 'constants/index';

const CustomToolbar = () => {
    const dispatch = useAppDispatch();

    const handleAddRequest = () => {
        dispatch(setServiceRequestForm(requestServiceFormInitValues));
        dispatch(setEditedRequestCurrentValues(null));
        dispatch(toggleForm());
    };
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button color="primary" variant="outlined" startIcon={<AddIcon />} onClick={handleAddRequest} style={{ marginLeft: 'auto' }}>
                Add Request
            </Button>
        </GridToolbarContainer>
    );
};

export default CustomToolbar;
