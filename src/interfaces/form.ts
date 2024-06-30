import { AlertColor, SxProps } from '@mui/material';

export type variant = 'standard' | 'outlined' | 'filled';

export interface SnackbarControlsInterface {
    isOpen: boolean;
    message: string;
    severity: AlertColor;
}

export interface InputFieldProps {
    fieldName: string;
    inputLabel: string;
    handleChange?: (updatedValue: string) => void;
    disableAutocomplete?: boolean;
    fieldStyle?: SxProps;
    disabled?: boolean;
}

export interface TextFieldProps extends InputFieldProps {
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
}

export interface DateFieldProps extends InputFieldProps {
    dateFormat?: string;
    disableFuture?: boolean;
    disablePast?: boolean;
}

export interface SelectMenuItemInterface {
    value: string | number;
    label: string;
}
export interface SelectFieldProps extends InputFieldProps {
    menuItems: SelectMenuItemInterface[];
    variant?: variant;
}
