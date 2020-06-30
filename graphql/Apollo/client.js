/* eslint-disable */
import 'cross-fetch/polyfill';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: operation => {
        operation.setContext({
            headers: {
                authorization: `Bearer 650ac614a0c552e706f4f83e56e65a9c9410d546`,
            }
        })
    }
});

export default client;

