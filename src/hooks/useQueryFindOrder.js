import { gql, useQuery } from "@apollo/client";

function useQueryFindOrder({ status }) {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query FindOrders(
        $query: orderGetOrderInput!
        $amount: Int!
        $page: Int!
      ) {
        findOrders(query: $query, amount: $amount, page: $page) {
          cancelReason
          date
          id
          items {
            id
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
            order {
              cancelReason
              date
              id
            }
          }
          phone
          shippingAddress
          status
          total
          userId
          userName
          email
        }
      }
    `,
    {
      variables: {
        query: {
          status,
        },
        page: 1,
        amount: 50,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      fetchPolicy: "no-cache",
    }
  );
  return { data, error, refetch };
}

export default useQueryFindOrder;
