import React from 'react';
import MainComponent from './components/Main.jsx';

window.addEventListener('load', () => {
  React.render(<MainComponent />, document.getElementById('app-container'));
});
