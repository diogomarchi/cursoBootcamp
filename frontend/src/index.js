import React from 'react';
import { render } from 'react-dom';

import App from './App';
/*
Escreve "hello world" dentro da div com id "app"
*/


//render(<h1>Hello world</h1>, document.getElementById('app'));
// "<App />" usado como tag
render(<App />, document.getElementById('app'));