import React from 'react';
import ReactDOM from 'react-dom';
import Loop from './reactGameKit/components/loop';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Loop>
    <App />
  </Loop>
), document.getElementById('root'));
registerServiceWorker();
