import React from 'react';
import { render } from 'react-testing-library';

import App from '../../pages/about';

describe('With React Testing Library', () => {
  it('Shows "This is the about page!"', () => {
    const { getByText } = render(<App />);
    expect(getByText('This is the about page')).not.toBeNull();
  });
});
