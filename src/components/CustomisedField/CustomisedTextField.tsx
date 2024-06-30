import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { TextFieldProps } from 'interfaces/form';

const CustomisedTextField = ({
    fieldName,
    inputLabel,
    fieldStyle = {},
    disableAutocomplete,
    multiline = false,
    disabled = false,
    minRows = undefined,
    maxRows = undefined,
}: TextFieldProps) => {
    const [field, meta] = useField(fieldName);

    return (
        <TextField
            {...field}
            autoComplete={disableAutocomplete ? 'new-password' : undefined}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            sx={fieldStyle}
            name={fieldName}
            disabled={disabled}
            label={inputLabel}
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            fullWidth
        />
    );
};

export default CustomisedTextField;
