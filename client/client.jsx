import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from '../app/components/Main.jsx';

import '../app/scss/main.scss';

window.addEventListener('load', () => {
  ReactDOM.render(<MainComponent />, document.getElementById('app-container'));
});
