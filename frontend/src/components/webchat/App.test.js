import React from 'react';
import ReactDOM from 'react-dom';
import VideoComponent from './VideoComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VideoComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
