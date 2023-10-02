import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge, Divider, Fab, ListItemIcon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { red } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { Settings, Logout } from '@mui/icons-material';
import * as authActions from '../../redux/actions/authAction';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.authReducer);

    return(<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Adidas
            </Typography>
            {!selector.isAuthenticated ?(
                <>
                    <Link to={"/login"}>
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link to={"/register"}>            
                        <Button color="inherit">Register</Button>
                    </Link>
                </>
            ):(
                <>
                <AvatarComponent selector={selector} />
                </>
            )}
            
          </Toolbar>
        </AppBar>
      </Box>)
}

export function AvatarComponent(props) {
    const dispatch = useDispatch();
	const navigate = useNavigate();

	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(authActions.logoutUserAction());
		navigate('/')
	};

	return (
		<>
			<Box sx={{ flexGrow: 0 }} textAlign={'end'}>
				<Tooltip title={"Mi cuenta"}>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt={props.selector.user.Name}
							src={props.selector.user.Avatar}
							imgProps={{ referrerPolicy: "no-referrer" }}
						/>
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
				>
					<MenuItem>
						{props.selector.user.Name} {props.selector.user.Last}
					</MenuItem>
					<Divider />
					<MenuItem onClick={(event) => {
						handleCloseUserMenu(event)
						navigate('/account')
					}}>
						<ListItemIcon>
							<Settings fontSize="small" sx={{ color: grey[900] }} />
						</ListItemIcon>
						Ajustes
					</MenuItem>
					<MenuItem
						onClick={(event) => {
							handleCloseUserMenu(event);
							handleLogout();
						}}
					>
						<ListItemIcon>
							<Logout fontSize="small" sx={{ color: red[500] }} />
						</ListItemIcon>
						Cerrar sesión
					</MenuItem>
				</Menu>
			</Box>
		</>
	);
}

export default Header;