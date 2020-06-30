import gql from 'graphql-tag';

export const GET_USER = gql`
   query GET_USER ($login: String!) {
       user(login: $login) {
           name
           avatarUrl
           bio
           id
       }
   }
`;
