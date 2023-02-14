import { gql } from 'apollo/client';

export const CREATE_NewEmployee = gql`
    mutation ($name: String!, $email: String!, $phone: Int!, $department: String!, imageUrl: $imageUrl) {
        id
        name
        email
        phone
        department
        imageUrl
    }
`;


export const UPDATE_Employee = gql`
    mutation ($id: ID!, $name: String, $email: String, $phone: Int, $department: String, imageUrl: $imageUrl) {
        id
        name
        email
        phone
        department
        imageUrl
    }
`;

export const DELETE_EmployeeById = gql`
  mutation ($id: ID!) {
    remove(id: $id) {
      id
    }
  }
`;
