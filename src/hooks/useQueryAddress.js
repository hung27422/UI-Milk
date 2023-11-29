import { gql, useQuery } from "@apollo/client";

function useQueryAddress() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query Addresses($amount: Int!, $page: Int!) {
        addresses(amount: $amount, page: $page) {
          city
          detail
          district
          id
          name
          phone
          userId
          ward
          isDefault
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: {
        amount: 50,
        page: 1,
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryAddress;
