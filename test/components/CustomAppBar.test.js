import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AppBar from '../../components/CustomAppBar';

let drawerOpen = false;
const setDrawer = () => {
  drawerOpen = !drawerOpen;
};

describe('renders the component', () => {
  it('title is "Hello World"', () => {
    const { getByText } = render(
      <AppBar title="Hello World" drawerHandler={setDrawer} />,
    );
    expect(getByText('Hello World')).not.toBeNull();
  });

  it('open menu on account icon click', () => {
    const { getAllByTestId } = render(
      <AppBar title="Hello World" drawerHandler={setDrawer} />,
    );
    fireEvent.click(getAllByTestId('openMenuAccount')[0]);
    expect(getAllByTestId('closeMenuAccount')[0]).not.toBeNull();
  });

  it('clickable title', () => {
    const { getAllByTestId } = render(
      <AppBar title="Hello World" drawerHandler={setDrawer} />,
    );
    fireEvent.click(getAllByTestId('clickableAppTitle')[0]);
    expect(getAllByTestId('clickableAppTitle')[0]).not.toBeNull();
  });
});
