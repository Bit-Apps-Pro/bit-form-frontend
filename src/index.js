import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppNavigator';
import { FormFieldProvider } from "./store";
import * as serviceWorker from './serviceWorker';
__webpack_public_path__ = bits.assetsURL;
ReactDOM.render(<FormFieldProvider><App /></FormFieldProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
