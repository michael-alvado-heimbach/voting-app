import React from 'react';
import { render } from 'react-testing-library';
import Drawer from '../../components/CustomDrawer';

let drawerOpen = false;
const setDrawer = () => {
  drawerOpen = !drawerOpen;
};

describe('renders the component', () => {
  it('render children', () => {
    const { getByText } = render(
      <Drawer open={drawerOpen} drawerHandler={setDrawer}>
        <h1>Hello World</h1>
      </Drawer>,
    );
    expect(getByText('Hello World')).not.toBeNull();
  });

  it('clickable dashboard menu', () => {
    let openDrawer = false;
    const { getAllByTestId } = render(
      <Drawer
        open={openDrawer}
        drawerHandler={() => {
          openDrawer = !openDrawer;
        }}
      />,
    );
    fireEvent.click(getAllByTestId('menuDashboard')[0]);
    expect(getAllByTestId('menuDashboard')[0]).not.toBeNull();
  });
});
