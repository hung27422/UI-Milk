import { gql, useQuery } from "@apollo/client";

function useQueryFindOrder({ status }) {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query FindOrdersByStatus(
        $query: orderGetOrderInput!
        $amount: Int!
        $page: Int!
      ) {
        findOrdersByStatus(query: $query, amount: $amount, page: $page) {
          cancelReason
          date
          email
          id
          items {
            sku
            id
            name
            orderId
            price
            productId
            quantity
            subtotal
          }
          phone
          shippingAddress
          status
          total
          userId
          userName
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
