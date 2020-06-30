import ReactDom from 'react-dom';
import React from 'react';
import Application from './ClientApplication';

ReactDom.hydrate(<Application />, window.document.getElementById('app'));
