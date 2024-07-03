/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import { GridColDef, GridColumnVisibilityModel, GridRenderCellParams } from '@mui/x-data-grid';
import { SelectMenuItemInterface, ServiceRequestFormInterface } from 'interfaces';
import * as yup from 'yup';

export const DATE_FORMAT = 'dd/MM/yyyy';

export const severityOptions: SelectMenuItemInterface[] = [
    {
        value: 'Low',
        label: 'Low',
    },
    {
        value: 'Medium',
        label: 'Medium',
    },
    {
        value: 'High',
        label: 'High',
    },
];

export const requestServiceFormInitValues: ServiceRequestFormInterface = {
    requestName: '',
    requestDescription: '',
    creationDate: '',
    severity: 'Low',
    resolutionDate: '',
    reporterName: '',
    contactInformation: '',
    location: '',
};

export const requestServiceFormValidation = yup.object().shape({
    requestName: yup.string().required('This field is required'),
    requestDescription: yup.string().required('This field is required'),
    creationDate: yup.string().required('This field is required'),
    severity: yup.string().required('This field is required'),
    resolutionDate: yup.string().required('This field is required'),
    reporterName: yup.string().required('This field is required'),
    contactInformation: yup.string().email('Inputted value is not a valid email').required('This field is required'),
    location: yup.string().required('This field is required'),
});

// Data Grid constants
export const DATA_GRID_COLUMNS: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        renderCell: (params: GridRenderCellParams<any, string>) => {
            return (
                <Typography component="span" sx={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2, color: 'primary' }}>
                    {params.value}
                </Typography>
            );
        },
        width: 200,
    },
    { field: 'requestName', headerName: 'Service Name', width: 150 },
    { field: 'requestDescription', headerName: 'Service Description', width: 300 },
    { field: 'creationDate', headerName: 'Creation Date', width: 150 },
    { field: 'severity', headerName: 'Severity', width: 150 },
    { field: 'resolutionDate', headerName: 'Resolution Date', width: 180 },
    { field: 'reporterName', headerName: 'Reporter Name', width: 180 },
    { field: 'contactInformation', headerName: 'Contact Information', width: 200 },
    { field: 'location', headerName: 'Location', width: 150 },
];

export const COLUMN_VISIBILITY_MODEL: GridColumnVisibilityModel = {
    id: true,
};

export const INITIAL_PAGE_SIZE = 5;

export const PAGE_SIZE_OPTIONS = [5, 10, 20];
