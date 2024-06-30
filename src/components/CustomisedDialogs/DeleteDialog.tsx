import React from 'react';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GridDeleteIcon } from '@mui/x-data-grid';

type Props = {
    isOpened: boolean;
    handleDialogClose: () => void;
    handleConfirmDeletion: () => void;
};
const DeleteDialog = ({ isOpened, handleDialogClose, handleConfirmDeletion }: Props) => {
    return (
        <Dialog
            data-testid="DeleteDialog"
            open={isOpened}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            sx={{ minWidth: '50vw' }}
        >
            <DialogTitle id="delete-dialog-title">
                <Typography sx={{ fontSize: '24px' }} fontWeight={700}>
                    Are you sure?
                </Typography>
                <IconButton
                    size="large"
                    aria-label="close"
                    color="inherit"
                    sx={{
                        position: 'absolute',
                        right: 15,
                        top: 10,
                    }}
                    onClick={handleDialogClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Divider />
                <Typography id="delete-dialog-description" variant="body1" sx={{ my: 2 }}>
                    Request deletion process is irreversible. Information will bee lost permanently.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={handleDialogClose}>
                        Close
                    </Button>
                    <Button startIcon={<GridDeleteIcon />} color="error" variant="contained" onClick={handleConfirmDeletion}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
