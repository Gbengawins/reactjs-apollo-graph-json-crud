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