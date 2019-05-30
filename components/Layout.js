import React from 'react';
import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
// import { render } from 'react-testing-library';
import AppBar from './CustomAppBar';
import Drawer from './CustomDrawer';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyC5A60WmhZCGOBvmg9eJw5pbzQO7YXnHMQ',
  authDomain: 'voting-app-db875.firebaseapp.com',
  projectId: 'voting-app-db875',
};
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account',
      },
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: '/',
  },
};

// const Layout = props => {
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      drawerOpen: false,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { children } = this.props;
    const { isSignedIn, drawerOpen } = this.state;
    return (
      <div>
        {isSignedIn && (
          <AppBar
            title="iVote"
            drawerHandler={() => {
              this.setState({
                drawerOpen: true,
              });
            }}
            handleSignOut={() => {
              firebase.auth().signOut();
            }}
            signStatus={isSignedIn}
          />
        )}
        <main role="main" className="mainContent">
          <Drawer
            open={drawerOpen}
            drawerHandler={() => {
              this.setState({
                drawerOpen: false,
              });
            }}
            signStatus={isSignedIn}
          >
            {!isSignedIn && (
              <div>
                <div align="center">
                  <h1>vote anyone.</h1>
                  <h1>do it everywhere.</h1>
                  <p>sign in to vote</p>
                </div>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            )}
            {isSignedIn && <div>{children}</div>}
          </Drawer>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
