import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
    isLoading: boolean;
}
const CustomisedLoader = ({ isLoading }: Props) => {
    return (
        <Backdrop data-testid="loader" open={isLoading} sx={{ zIndex: 1500 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default CustomisedLoader;
