import { GlobalStylesProps, createTheme } from '@mui/material';
import { green, grey, pink, red, lightBlue, orange } from '@mui/material/colors';

const customFontURL = 'https://s3bucket-data-foundry-dev14154-dev.s3.amazonaws.com/public/customFont.ttf';

export const globalStyles: GlobalStylesProps['styles'] = {
    '@font-face': {
        fontFamily: 'CustomFont',
        fontStyle: 'normal',
        fontWeight: 400,
        src: `url(${customFontURL}) format('truetype')`,
    },
    html: {
        fontFamily: 'CustomFont, Arial, sans-serif',
    },
    body: {
        margin: 0,
    },
};

const baseTheme = createTheme({
    typography: {
        allVariants: { fontFamily: 'CustomFont' },
    },

    palette: {
        secondary: {
            light: '#B7C4CF',
            dark: '#000000',
            main: 'rgba(0, 0, 0, 0.87)',
        },
    },
});

export const lightTheme = createTheme({
    ...baseTheme,
    palette: {
        ...baseTheme.palette,
        mode: 'light',
        secondary: { main: '#fff' },
        text: {
            primary: grey[900],
            secondary: grey[800],
        },
    },
    components: {
        ...baseTheme.components,
        MuiSnackbar: {
            variants: [
                {
                    props: { variant: 'warning' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: orange[800],
                        },
                    },
                },
                {
                    props: { variant: 'error' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: red[800],
                        },
                    },
                },
                {
                    props: { variant: 'info' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: lightBlue[800],
                        },
                    },
                },
                {
                    props: { variant: 'success' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: green[800],
                        },
                    },
                },
            ],
        },
    },
});
export const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        ...baseTheme.palette,
        mode: 'dark',
        divider: '#fff',
        primary: { main: '#fff' },
        secondary: { main: '#fff' },
        background: {
            default: grey[500],
            paper: grey[900],
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
    },
    components: {
        ...baseTheme.components,
        MuiAlert: {
            styleOverrides: {
                root: {
                    '& .MuiAlert-message': {
                        color: '#fff',
                    },

                    border: 'solid 1px #fff',
                },
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    '& .MuiSnackbarContent-message': {
                        color: '#fff',
                    },
                    '& .MuiIconButton-root': {
                        color: '#fff',
                    },
                },
            },
            variants: [
                {
                    props: { variant: 'warning' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: orange[400],
                        },
                    },
                },
                {
                    props: { variant: 'error' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: pink[200],
                        },
                    },
                },
                {
                    props: { variant: 'info' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: lightBlue[400],
                        },
                    },
                },
                {
                    props: { variant: 'success' },
                    style: {
                        '& .MuiSnackbarContent-root': {
                            background: green[600],
                        },
                    },
                },
            ],
        },

        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    '&.Mui-error': { color: pink[300] },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-error': { color: pink[300] },
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    '&.MuiFormHelperText-root.Mui-error': { color: pink[300] },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.MuiFormLabel-root.Mui-error': { color: pink[300] },
                },
            },
        },
    },
});
