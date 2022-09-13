import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  List as ListIcon,
  Label as LabelIcon,
} from "@mui/icons-material";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: "20vw",
  },
}));

function Navigation() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = [
    { text: "TodoList", icon: <ListIcon /> },
    { text: "Tags", icon: <LabelIcon /> },
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          onClick={toggleDrawer}
          className={classes.menuIcon}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Link href="#" color="textPrimary" underline="none" variant="h6">
          TodoApp
        </Link>
        <Box flexGrow={1} />
        <Button size="large">Login</Button>
      </Toolbar>
      <Drawer
        anchor="left"
        variant="temporary"
        onClose={toggleDrawer}
        open={drawerOpen}
      >
        <List className={classes.list}>
          {drawerItems.map((prop) => (
            <ListItem onClick={toggleDrawer} button key={prop.text}>
              <ListItemIcon>{prop.icon}</ListItemIcon>
              <ListItemText>{prop.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navigation;
