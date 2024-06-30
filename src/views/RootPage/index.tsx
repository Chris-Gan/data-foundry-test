import { CssBaseline, GlobalStyles } from '@mui/material';
import Routes from 'Routes';
import { signOut } from 'aws-amplify/auth';
import CustomisedLoader from 'components/CustomisedLoader';
import CustomisedSnackbar from 'components/CustomisedSnackbar';
import Navbar from 'components/Navbar';
import { globalStyles } from 'constants/index';
import { closeSnackbar, hideLoading, selectLoadingState, selectSnackbar, showLoading, toggleTheme } from 'context/app';
import { useAppDispatch } from 'context/store';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const RootPage = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectLoadingState);
    const snackbar = useSelector(selectSnackbar);
    const { isOpen, message, severity } = snackbar;

    const handleThemeButtonOnClick = () => {
        dispatch(toggleTheme());
    };

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
    };

    const handleSignOutOnClick = async () => {
        dispatch(showLoading());
        await signOut();
        dispatch(hideLoading());
    };
    return (
        <>
            <Suspense fallback={<CustomisedLoader isLoading={loading} />} />
            <GlobalStyles styles={globalStyles} />
            <CssBaseline />
            <Navbar handleThemeButtonOnClick={handleThemeButtonOnClick} handleSignOutOnClick={handleSignOutOnClick} />
            <Router basename="/">
                <Routes />
            </Router>
            <CustomisedLoader isLoading={loading} />
            <CustomisedSnackbar isOpen={isOpen} message={message} severity={severity} handleOnClose={handleCloseSnackbar} />
        </>
    );
};

export default RootPage;
