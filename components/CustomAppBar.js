import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Router from 'next/router';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      textAlign: 'center',
    },
    cursor: 'pointer',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    boxShadow: '0 0.5px 0.5px 0.5px rgba(90, 90, 90, 0.1)',
  },
});

class CustomAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      title,
      drawerHandler,
      handleSignOut,
      signStatus,
    } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        data-testid="closeMenuAccount"
      >
        <MenuItem
          onClick={() => {
            handleSignOut();
            this.handleMenuClose();
          }}
          data-testid="closeMenuAccountItem"
        >
          Log Out
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            {signStatus && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={drawerHandler}
              >
                <MenuIcon />
              </IconButton>
            )}
            {!signStatus && <div style={{ width: '56px' }} />}
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              onClick={() => {
                Router.push('/');
              }}
              data-testid="clickableAppTitle"
            >
              {title}
            </Typography>
            {signStatus && (
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                data-testid="openMenuAccount"
                color="inherit"
                aria-label="accountMenu"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  drawerHandler: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  signStatus: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CustomAppBar);
