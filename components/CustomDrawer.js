import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListSubheader from '@material-ui/core/ListSubheader';
import Router from 'next/router';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 10,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuTitle: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: '4vh',
    fontSize: '20px',
  },
});

const CustomDrawer = props => {
  const { classes, children, open, drawerHandler } = props;
  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={drawerHandler}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.menuTitle}>Supplier</div>
        <Divider />
        <List subheader={<ListSubheader>Menu</ListSubheader>}>
          <ListItem
            button
            key="Dashboard"
            onClick={() => {
              drawerHandler();
              Router.push('/');
            }}
            data-testid="menuDashboard"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            key="Products"
            onClick={() => {
              drawerHandler();
              Router.push('/about');
            }}
            data-testid="menuProduct"
          >
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <div
        tabIndex={0}
        role="button"
        className={classes.root}
        onClick={drawerHandler}
        onKeyDown={drawerHandler}
        aria-label="closeDrawer"
      >
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
};

CustomDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  drawerHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomDrawer);
