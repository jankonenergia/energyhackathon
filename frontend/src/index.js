import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FontFaceObserver from 'fontfaceobserver';
import { createBrowserHistory as createHistory } from 'history'
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';

import App from './App';

import './theme/theme.scss';
import colors from './theme/colors.scss';

// Load the favicon
/* eslint-disable-next-line import/no-webpack-loader-syntax */
// import '!file-loader?name=[name].[ext]!./images/favicon.ico';

//import './theme/theme.scss';
//import 'theme/colors.scss';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      500: colors.primary,
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const eczarObserver = new FontFaceObserver('Eczar', {});
const robotoObserver = new FontFaceObserver('Roboto Condensed', {});

eczarObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

robotoObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

const client = new ApolloClient({
  uri: "https://graphql.jankon.energy",
  request: operation => {
    if (localStorage.getItem('token')) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
  },
  cache: new InMemoryCache(),
});

const history = createHistory();
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router history={history}>
          <App />
        </Router>
      </ApolloProvider>
    </MuiThemeProvider>,
    MOUNT_NODE
  );
};

render();

serviceWorker.unregister();
