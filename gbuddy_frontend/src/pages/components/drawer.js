import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DrawerBox({ open, toggleDrawer }) {
  const iconMap = {
    Assignments: <InboxIcon />,
    'Exam Prep': <MailIcon />,
    'Previous Papers': <InboxIcon />,
    'My Files': <MailIcon />,
    Settings: <SettingsIcon />,
    'Edit Profile': <PersonIcon />,
    'Sign Out': <LogoutIcon />,
  };

  const [data, setData] = useState({
    name: "User Name",
    email: "User Email"
});

useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/user/get?token=${token}`)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          <ListItem>
            <ListItemText primary="G-Buddy" sx={{ textAlign: 'center' }} />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <img src="https://source.unsplash.com/random" alt="Random Image" style={{ width: '150px', height: "150px", margin: '0 auto', borderRadius: "50%" }} />
          </ListItem>
          <ListItem alignItems='center'>
            <ListItemText primary={data.name} sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem alignItems='center'>
          <ListItemText primary={data.email} sx={{ textAlign: 'center' , marginTop : "-20px"}} />
          </ListItem>
        </List>
        <List>
          {['Assignments', 'Exam Prep', 'Previous Papers', 'My Files'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {iconMap[text]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings', 'Edit Profile', 'Sign Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {iconMap[text]}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
