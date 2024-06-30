import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import { DATE_FORMAT } from 'constants/index';
import { format, parse } from 'date-fns';
import { useField, useFormikContext } from 'formik';
import { DateFieldProps } from 'interfaces';
import { useEffect, useState } from 'react';

const CustomisedDateField = ({
    fieldName,
    inputLabel,
    fieldStyle = {},
    dateFormat = DATE_FORMAT,
    handleChange = undefined,
    disabled = false,
    disableFuture = false,
    disablePast = false,
}: DateFieldProps) => {
    const [field, meta, helper] = useField(fieldName);
    const { value } = field;
    const { setFieldError } = useFormikContext();
    const [localDateValue, setLocalDateValue] = useState<Date | null>(value ? parse(value, dateFormat, new Date()) : null);

    const handleOnChange = (newValue: Date | null) => {
        try {
            setLocalDateValue(newValue);
            if (newValue) {
                const stringifiedDate = format(newValue, dateFormat);
                if (handleChange) handleChange(stringifiedDate);
                helper.setValue(stringifiedDate);
            }
        } catch (error) {
            setFieldError(fieldName, `Invalid date format, please use ${DATE_FORMAT}`);
        }
    };

    const handleError = (reason: DateValidationError) => {
        if (reason === 'invalidDate') {
            setFieldError(fieldName, `Invalid date format, please use ${DATE_FORMAT}`);
        }
    };

    useEffect(() => {
        try {
            setLocalDateValue(value ? parse(value, dateFormat, new Date()) : null);
        } catch (error) {
            setFieldError(fieldName, `Invalid date format, please use ${DATE_FORMAT}`);
        }
    }, [value, dateFormat, fieldName, setFieldError]);

    return (
        <DatePicker
            format={dateFormat}
            {...field}
            disabled={disabled}
            value={localDateValue}
            onChange={handleOnChange}
            label={inputLabel}
            disableFuture={disableFuture}
            disablePast={disablePast}
            onError={handleError}
            sx={fieldStyle}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    variant: 'outlined',
                    error: meta.touched && !!meta.error,
                    helperText: meta.touched && meta.error,
                },
            }}
        />
    );
};

export default CustomisedDateField;
