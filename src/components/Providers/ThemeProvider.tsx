import { ThemeProvider as MuiThemeProvider, responsiveFontSizes } from '@mui/material';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'context';
import { darkTheme, lightTheme } from 'constants/index';

interface ThemeProviderProps {
    children: ReactNode;
}
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const themeMode = useSelector(selectThemeMode);
    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return <MuiThemeProvider theme={responsiveFontSizes(theme)}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
