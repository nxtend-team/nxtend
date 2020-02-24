import React from 'react';
import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have "Start with Ionic" in the content', () => {
    const { getByText } = render(<App />);
    expect(getByText('Start with Ionic')).toBeTruthy();
  });
});
