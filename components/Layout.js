import PropTypes from 'prop-types';
import { useState } from 'react';
import AppBar from './CustomAppBar';
import Drawer from './CustomDrawer';

const Layout = props => {
  const { children } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <AppBar
        title="Supplier"
        drawerHandler={() => {
          setDrawerOpen(true);
        }}
      />
      <main role="main" className="mainContent">
        <Drawer
          open={drawerOpen}
          drawerHandler={() => {
            setDrawerOpen(false);
          }}
        >
          {children}
        </Drawer>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
