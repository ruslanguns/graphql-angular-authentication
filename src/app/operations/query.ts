import gql from 'graphql-tag';


export const getUsers = gql`
  query {
    users {
      id
      name
      lastname
      email
      registerDate
    }
  }
`;

export const login = gql`
  query {
    login(email: "ruslanguns@gmail.com", password: "123456") {
      status
      message
      token
    }
  }
`;

export const meData = gql`
  query {
    me {
      status
      message
      user {
        id
        name
        lastname
        email
      }
    }
  }
`;
