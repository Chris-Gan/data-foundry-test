import { Box, Divider, Typography } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import NoData from 'components/NoData';
import { COLUMN_VISIBILITY_MODEL, DATA_GRID_COLUMNS, INITIAL_PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'constants/index';
import { setEditedRequestCurrentValues, setServiceRequestForm, toggleForm } from 'context';
import { useAppDispatch } from 'context/store';
import useServices from 'hooks/useServices';
import { ServiceHistoryInterface } from 'interfaces';
import React from 'react';
import CustomToolbar from 'views/RequestHistoryPage/CustomToolbar';
import RequestServiceForm from './RequestServiceForm';

const RequestHistoryPage: React.FC = () => {
    const { serviceHistories } = useServices();
    const dispatch = useAppDispatch();

    const styledDataGrid = {
        maxWidth: '100vw',
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600 !important',
        },
    };
    const handleOnCellClick = (params: GridRowParams<ServiceHistoryInterface>) => {
        dispatch(setServiceRequestForm(params.row));
        dispatch(setEditedRequestCurrentValues(params.row));
        dispatch(toggleForm());
    };

    return (
        <>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ my: 4, width: '100%' }}>
                <Typography sx={{ alignSelf: 'flex-start', ml: '5%', fontWeight: 550, mb: 2 }} variant="h4" gutterBottom>
                    Service Request Histories
                </Typography>
                <Divider />
                <Box sx={{ width: '90%', height: '80vh' }}>
                    <DataGrid
                        sx={styledDataGrid}
                        rows={serviceHistories ?? []}
                        columns={DATA_GRID_COLUMNS}
                        initialState={{
                            columns: {
                                columnVisibilityModel: COLUMN_VISIBILITY_MODEL,
                            },
                            pagination: {
                                paginationModel: {
                                    pageSize: INITIAL_PAGE_SIZE,
                                },
                            },
                        }}
                        slots={{
                            toolbar: CustomToolbar,
                            noRowsOverlay: NoData,
                        }}
                        onRowClick={handleOnCellClick}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                    />
                </Box>
            </Box>
            <RequestServiceForm />
        </>
    );
};

export default RequestHistoryPage;
