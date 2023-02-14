import { gql } from '@apollo/client';

export const GET_Employees = gql`
    query {
        allEmployees {
            id
            name
            email
            phone
            department
            imageUrl
        }
    }
`;

export const GET_EmployeeById = gql`
  query ($id:ID!) {
    Employee(id: $id) {
      id
      name
      email
      phone
      department
      imageUrl
    }
  }
`;

