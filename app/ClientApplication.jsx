import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../graphql/Apollo/client';
import Application from "./Application";

const ClientApp = () => (
    <ApolloProvider client={client}>
        <Application />
    </ApolloProvider>
)

export default ClientApp;
