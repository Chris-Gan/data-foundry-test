import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectFieldProps } from 'interfaces';
import { useField } from 'formik';

const CustomisedSelectField = ({
    fieldName,
    inputLabel,
    fieldStyle = {},
    menuItems,
    handleChange = undefined,
    variant = 'outlined',
    disabled = false,
}: SelectFieldProps) => {
    const [field, meta, helper] = useField(fieldName);

    const handleSelectOnChange = (_event: SelectChangeEvent<any>) => {
        const latestValue = _event.target.value;
        if (handleChange) handleChange(latestValue);
        helper.setValue(latestValue);
    };
    return (
        <FormControl disabled={disabled} error={meta.touched && !!meta.error} variant={variant} sx={{ ...fieldStyle }}>
            <InputLabel>{inputLabel}</InputLabel>
            <Select {...field} onChange={handleSelectOnChange} label={inputLabel}>
                {menuItems.map(({ value, label }) => (
                    <MenuItem key={`${label}-${value}`} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
        </FormControl>
    );
};

export default CustomisedSelectField;
