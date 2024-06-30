import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ReactNode } from 'react';

interface LocalizationProviderProps {
    children: ReactNode;
}
const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
    return <MuiLocalizationProvider dateAdapter={AdapterDateFns}>{children}</MuiLocalizationProvider>;
};

export default LocalizationProvider;
