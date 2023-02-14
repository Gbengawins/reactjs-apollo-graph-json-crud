import { gql } from 'apollo/client';

export const CREATE_NewEmployee = gql`
    mutation ($name: String!, $email: String!, $phone: Int!, imageUrl: $imageUrl)
`