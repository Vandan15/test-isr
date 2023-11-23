import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser {
    getCurrentUser {
      email
      firstName
      lastName
      id
    }
  }
`;
