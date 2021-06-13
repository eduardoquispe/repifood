import React from 'react';
import ReactDOM from 'react-dom';
import "@progress/kendo-theme-default/dist/all.scss";
import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import './index.scss';
import App from './App';

import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <LocalizationProvider language="es-ES">
      <IntlProvider locale="es">
        <App />
      </IntlProvider>
    </LocalizationProvider>
  </Provider>,
  document.getElementById('root')
);
