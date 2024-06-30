import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import DeleteDialog from 'components/CustomisedDialogs/DeleteDialog';
import CustomisedDateField from 'components/CustomisedField/CustomisedDateField';
import CustomisedSelectField from 'components/CustomisedField/CustomisedSelectField';
import CustomisedTextField from 'components/CustomisedField/CustomisedTextField';
import { requestServiceFormValidation, severityOptions } from 'constants/index';
import {
    hideDeleteDialog,
    selectCurrentEditedRequest,
    selectDeleteDialogState,
    selectIsEditingMode,
    selectIsFormDialogOpen,
    selectServiceRequestForm,
    showDeleteDialog,
    showLoading,
    toggleForm,
} from 'context';
import { useAppDispatch } from 'context/store';
import { FormikProvider, useFormik } from 'formik';
import { calculateResolutionDate } from 'helpers/serviceHistory';
import useServiceHistories from 'hooks/useServices';
import { ServiceRequestFormInterface } from 'interfaces';
import { useSelector } from 'react-redux';

const RequestServiceForm = () => {
    const dispatch = useAppDispatch();
    const formInitValues = useSelector(selectServiceRequestForm);
    const { createServiceRequestMutation, updateServiceRequestMutation, deleteServiceRequestMutation } = useServiceHistories();
    const isFormDialogOpen = useSelector(selectIsFormDialogOpen);
    const isDeleteDialogOpened = useSelector(selectDeleteDialogState);
    const isEditingMode = useSelector(selectIsEditingMode);
    const currentEditingRequest = useSelector(selectCurrentEditedRequest);
    const validEditableExistingRequest = isEditingMode && !!currentEditingRequest;

    const submitButtonLabel = isEditingMode ? 'Update' : 'Create';
    const dialogHeader = isEditingMode ? 'Update Service Request' : 'Create New Service Request';

    const handleOnSubmit = async (values: ServiceRequestFormInterface) => {
        dispatch(showLoading());
        if (!isEditingMode) await createServiceRequestMutation.mutateAsync(values);
        if (isEditingMode && currentEditingRequest) await updateServiceRequestMutation.mutateAsync({ id: currentEditingRequest.id, values });
    };

    const formik = useFormik({
        initialValues: formInitValues,
        validationSchema: requestServiceFormValidation,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: handleOnSubmit,
    });

    const { dirty, isValid, isSubmitting, values, setFieldValue, resetForm, submitForm } = formik;

    const handleFormDialogClose = () => {
        dispatch(toggleForm());
    };

    const handleSeverityOnChange = (updatedSeverity: string) => {
        const updatedResolutionDate = calculateResolutionDate(values.creationDate, updatedSeverity);
        setFieldValue('resolutionDate', updatedResolutionDate);
    };

    const handleCreationDateOnChange = (latestDate: string) => {
        const { severity } = values;
        const updatedResolutionDate = calculateResolutionDate(latestDate, severity);
        setFieldValue('resolutionDate', updatedResolutionDate);
    };

    const handleResetButtonOnClick = () => {
        resetForm();
    };

    const handleDeleteButtonOnClick = () => {
        dispatch(showDeleteDialog());
    };

    const closeDeleteDialog = () => {
        dispatch(hideDeleteDialog());
    };

    const handleConfirmRequestDeletion = async () => {
        dispatch(showLoading());
        if (validEditableExistingRequest) await deleteServiceRequestMutation.mutateAsync(currentEditingRequest.id);
    };

    return (
        <FormikProvider value={formik}>
            <Dialog open={isFormDialogOpen}>
                <DialogTitle>
                    <Typography sx={{ fontSize: '24px' }} fontWeight={700}>
                        {dialogHeader}
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
                        onClick={handleFormDialogClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {validEditableExistingRequest && (
                        <Alert severity="info">You are currently editing an existing request with id {currentEditingRequest.id} </Alert>
                    )}
                    <CustomisedTextField fieldName="requestName" inputLabel="Service Request Name *" fieldStyle={{ my: { xs: 2, md: 2 } }} />
                    <CustomisedTextField
                        fieldName="requestDescription"
                        inputLabel="Service Request Description *"
                        multiline
                        minRows={5}
                        maxRows={10}
                        fieldStyle={{ my: { xs: 2, md: 2 } }}
                    />
                    <CustomisedDateField
                        fieldName="creationDate"
                        inputLabel="Creation Date *"
                        disablePast
                        handleChange={handleCreationDateOnChange}
                        fieldStyle={{ my: { xs: 2, md: 2 }, width: '100%' }}
                    />
                    <CustomisedSelectField
                        fieldName="severity"
                        inputLabel="Severity *"
                        menuItems={severityOptions}
                        handleChange={handleSeverityOnChange}
                        fieldStyle={{ my: { xs: 2, md: 2 }, width: '100%' }}
                    />
                    <CustomisedDateField
                        fieldName="resolutionDate"
                        inputLabel="Resolution Date *"
                        disabled
                        fieldStyle={{ my: { xs: 2, md: 2 }, width: '100%' }}
                    />
                    <CustomisedTextField fieldName="reporterName" inputLabel="Reporter Name *" fieldStyle={{ my: { xs: 2, md: 2 } }} />
                    <CustomisedTextField fieldName="contactInformation" inputLabel="Contact Email *" fieldStyle={{ my: { xs: 2, md: 2 } }} />
                    <CustomisedTextField fieldName="location" inputLabel="Location *" fieldStyle={{ my: { xs: 2, md: 2 } }} />
                    <Box display="flex" justifyContent="space-between">
                        <Button sx={{ mt: 2 }} disabled={!dirty} variant="outlined" type="button" onClick={handleResetButtonOnClick}>
                            Reset
                        </Button>
                        <Box>
                            {validEditableExistingRequest && (
                                <Button
                                    sx={{ mt: 2, mr: { md: 2, sm: 0 } }}
                                    color="error"
                                    onClick={handleDeleteButtonOnClick}
                                    variant="contained"
                                    type="button"
                                >
                                    Delete
                                </Button>
                            )}
                            <Button
                                sx={{ mt: 2 }}
                                disabled={!isValid || isSubmitting || !dirty}
                                onClick={submitForm}
                                variant="contained"
                                type="button"
                            >
                                {submitButtonLabel}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            <DeleteDialog
                isOpened={isDeleteDialogOpened}
                handleDialogClose={closeDeleteDialog}
                handleConfirmDeletion={handleConfirmRequestDeletion}
            />
        </FormikProvider>
    );
};

export default RequestServiceForm;
