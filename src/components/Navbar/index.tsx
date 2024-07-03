import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface Props {
    theme: Theme;
    handleThemeButtonOnClick: () => void;
    handleSignOutOnClick: () => void;
}
const Navbar = ({ theme, handleThemeButtonOnClick, handleSignOutOnClick }: Props) => {
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
