import React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import App from './App.js';

describe('Our first snapshot test', () => {
  it('Should compare the component with a snapshot', () => {
    const component = ReactTestRenderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
