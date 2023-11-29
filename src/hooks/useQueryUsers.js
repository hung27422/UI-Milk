import { gql, useQuery } from "@apollo/client";

function useQueryUsers() {
  const { data, error } = useQuery(
    gql`
      query Users($amount: Int!, $page: Int!) {
        users(amount: $amount, page: $page) {
          email
          id
          imageURL
          name
          phoneNumber
          role {
            description
            id
            name
          }
          token
          address {
            city
            detail
            district
            id
            isDefault
            name
            phone
            userId
            ward
          }
        }
      }
    `,
    {
      variables: {
        amount: 50,
        page: 1,
      },
    }
  );
  return { data, error };
}

export default useQueryUsers;
