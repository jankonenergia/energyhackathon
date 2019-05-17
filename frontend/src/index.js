import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: "http://jankon.energy:4000",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJmaXJzdE5hbWUiOiJLYWxlcnZvIiwibGFzdE5hbWUiOiJKYW5ra28iLCJlbWFpbCI6ImFzaWEua3Vubm9zc2FAamFua2tvLmVuZXJneSIsImNyZWF0ZWRBdCI6IjIwMTktMDQtMzBUMjE6MDE6MDcrMDA6MDAifQ.8AMQR2p1nRbmzV7O8NNHcZ0IBMes7QpqEAKyjV7jcC4`
      },
    });
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));

serviceWorker.unregister();
