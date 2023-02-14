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