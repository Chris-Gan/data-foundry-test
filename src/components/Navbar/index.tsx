import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
    handleThemeButtonOnClick: () => void;
    handleSignOutOnClick: () => void;
}
const Navbar = ({ handleThemeButtonOnClick, handleSignOutOnClick }: Props) => {
    const theme = useTheme();

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">The Data Foundry.</Typography>
                <div>
                    <Button onClick={handleSignOutOnClick} variant="outlined" color="inherit">
                        Sign Out
                    </Button>
                    <Tooltip title="Toggle Theme" arrow placement="bottom">
                        <IconButton data-testid="themeButton" sx={{ ml: 1 }} onClick={handleThemeButtonOnClick} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
