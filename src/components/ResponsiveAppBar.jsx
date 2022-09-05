import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../utils/images/logo.jpg";
import { Stack, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { logout } from '../store/actions';
import OutlinedButton from './OutlinedButton';


const StyledBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        borderBottom: "2px solid var(--primary-color)",
    },
}));

const ResponsiveAppBar = ({ pages }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }


    const navigate = useNavigate();
    const location = useLocation();
    const pathName0 = location.pathname;
    const pathName1 = (pathName0 !== '/admin') ? pathName0.split("/")[2] : pathName0;
    const pathName = (pathName1.includes("-")) ? pathName1.split("-")[1] : pathName1;  //dashboard, blog, gallery, videos

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <Box>
            <AppBar component='nav' sx={{ bgcolor: "var(--primary-color)" }}>
                <Toolbar>
                    <Avatar
                        alt="Team Management"
                        src={logo}
                        sx={{ width: 40, height: 40, border: "1px solid var(--light-grey)", display: { xs: 'none', md: 'flex' } }}

                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mx: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',

                        }}
                    >
                        TEAM MANAGEMENT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                                    <Typography
                                        key={page.route}
                                        onClick={() => { navigate(`/admin/${page.route}`) }}
                                        sx={{ color: 'var(--primary-color)', mx: 2 }}
                                    >
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Avatar
                        alt="Team Management"
                        src={logo}
                        sx={{ width: 40, height: 40, border: "1px solid var(--light-grey)", display: { xs: 'flex', md: 'none' } }}

                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mx: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TEAM MANAGEMENT
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: "var(--secondary-color)" }}>{user?.user_name?.substr(0, 1)}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu

                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            align="center"
                        >
                            <Stack alignItems="center">

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" sx={{ color: "var(--primary-color)" }}>{user.user_name}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <OutlinedButton text="Logout" size="small" onClick={handleLogout} />
                                </MenuItem>
                            </Stack>

                        </Menu>

                    </Box>
                </Toolbar>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, bgcolor: "var(--light-grey)", paddingLeft: '15%', width: "100vw" }}>
                    {pages.map((page) => (
                        <StyledBox sx={{ borderBottom: (page.route.includes(pathName)) ? "2px solid var(--primary-color)" : "0px solid var(--primary-color)" }}>
                            <Button
                                key={page.route}
                                onClick={() => { navigate(`/admin/${page.route}`) }}
                                sx={{ mt: 1, mx: 2, color: 'var(--primary-color)', }}
                            >
                                {page.name}
                            </Button>
                        </StyledBox>
                    ))}

                </Box>
            </AppBar>
        </Box>
    );
};
export default ResponsiveAppBar;
