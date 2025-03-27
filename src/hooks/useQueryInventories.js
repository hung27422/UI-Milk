import { gql, useQuery } from "@apollo/client";
import { tokenAdmin } from "~/TokenTestSelenium/token";

function useQueryInventories() {
  const { data, error, refetch } = useQuery(
    gql`
      query Inventories($amount: Int!, $offset: Int!) {
        inventories(amount: $amount, offset: $offset) {
          availability
          id
          productId
          quantity
        }
      }
    `,
    {
      variables: {
        amount: 50,
        offset: 1,
      },
      context: {
        headers: {
          authorization: `Bearer ${tokenAdmin}`,
        },
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryInventories;
