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
            Product {
              images
            }
          }
          phone
          shippingAddress
          status
          total
          userId
          userName
          pointDeductionAmount
        }
      }
    `,
    {
      variables: {
        query: {
          status,
          pointDeductionAmount: 0,
        },
        page: 1,
        amount: 100,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      pollInterval: 5000,
    }
  );
  return { data, error, refetch };
}

export default useQueryFindOrder;
