import React, { useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Logout as LogoutIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

const drawerWidth = 240;
const menuItems = [
  {
    link: '/mail/inbox',
    name: 'Inbox',
    icon: <InboxIcon />,
  },
  {
    link: '/mail/sent',
    name: 'Sent',
    icon: <MailIcon />,
  },
];

export function Navbar(props) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = useRef([]);

  const selectedPage = useSelector((state) => state.page.selectedPage);
  const wallet = useSelector((state) => state.account.wallet);

  const handleLogout = async () => {
    await wallet.disconnect();
    props.history.push('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu = (
    <div>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: { sm: 64, xs: 48 },
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo192.png`}
          style={{ maxHeight: '70%' }}
          alt="logo"
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((el, index) => (
          <Link
            to={el.link}
            style={{
              textDecoration: 'none',
              color: theme.palette.text.primary,
            }}
            key={index}
            ref={(node) => (links.current[index] = node)}
          >
            <ListItemButton
              selected={selectedPage === el.name}
              onClick={() => links.current[index].click()}
            >
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={el.name} />
            </ListItemButton>
          </Link>
        ))}
        <Divider />
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open-drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {menu}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {menu}
        </Drawer>
      </Box>
    </Box>
  );
}
