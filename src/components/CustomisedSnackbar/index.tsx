import CloseIcon from '@mui/icons-material/Close';
import { AlertColor, IconButton, Snackbar } from '@mui/material';
import { SnackbarControlsInterface } from 'interfaces';

declare module '@mui/material/Snackbar' {
    interface SnackbarProps {
        variant: AlertColor;
    }
}

interface Props extends SnackbarControlsInterface {
    handleOnClose: () => void;
}
const CustomisedSnackbar = ({ isOpen, message, severity, handleOnClose }: Props) => {
    return (
        <Snackbar
            open={isOpen}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            message={message}
            variant={severity}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleOnClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
            autoHideDuration={6000}
            onClose={handleOnClose}
        />
    );
};

export default CustomisedSnackbar;
