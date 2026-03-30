import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Drawer, List, 
  ListItemButton, ListItemIcon, ListItemText, Collapse, Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Вимога 2: App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Система Управління
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Вимога 2: Persistent Sidebar (Drawer) */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Відступ, щоб меню не ховалося під AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          {/* Вимога 2: List з іконками MUI */}
          <List>
            <ListItemButton>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Дашборд" />
            </ListItemButton>

            {/* Вимога 2: Nested List (Collapse) */}
            <ListItemButton onClick={toggleSettings}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Налаштування" />
              {settingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText primary="Профіль" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon><SecurityIcon /></ListItemIcon>
                  <ListItemText primary="Безпека" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Основний контент сторінки */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};