import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DrawerBox from "./drawer";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const list = ['Profile','Settings', 'Edit Profile', 'Sign Out']

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="fixed" sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'transparent' }}>
        <Toolbar>
          <IconButton edge="start" color="black" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color:"black", fontWeight: "bold" }}>
            G-Buddy
          </Typography>
          
          <Button color="inherit" style={{padding: "0 20px", color: "black"}} >Home</Button>
          <Button color="inherit" style={{padding: "0 20px", color: "black"}}>Assignments</Button>
          <Button color="inherit" style={{padding: "0 20px", color: "black"}}>AddNotes</Button>

          <Box sx={{ flexGrow: 0 }} style={{padding: "0 20px"}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {list.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" style={{ color: "black" }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
        </Toolbar>
      </AppBar>
      {/* Render the DrawerBox component */}
      <DrawerBox open={drawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
}