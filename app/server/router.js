import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import Application from '../Application';

export default function router(req, res) {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      authorization: `Bearer 650ac614a0c552e706f4f83e56e65a9c9410d546`,
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
  });

  const App = () => (
    <ApolloProvider client={client}>
      <Application />
    </ApolloProvider>
  );

  const html = ReactDOMServer.renderToString(App);
  const indexFile = path.resolve('./app/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    return res.send(data.replace('<div id="app"></div>', `<div id="app">${html}</div>`));
  });
}
