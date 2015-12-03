import React from 'react';
import MainComponent from '../app/components/Main.jsx';

import '../app/scss/main.scss';

window.addEventListener('load', () => {
  React.render(<MainComponent />, document.getElementById('app-container'));
});
