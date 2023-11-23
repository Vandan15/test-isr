import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation emailPasswordLogin($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      message
      data {
        token
        refreshToken
        user {
          id
          email
          profileImage
          name
          firstName
          lastName
        }
      }
    }
  }
`;
