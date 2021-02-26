import React from 'react';
import ReactDOM from 'react-dom';
import LibraryApp from './LibraryApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LibraryApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
