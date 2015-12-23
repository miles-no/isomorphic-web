import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from '../components/Main.jsx';

import './client.scss';

window.addEventListener('load', () => {
  ReactDOM.render(<MainComponent />, document.getElementById('app-container'));
});
