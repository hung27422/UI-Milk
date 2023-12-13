import { gql, useQuery } from "@apollo/client";

function useReviews() {
  const { data, error, refetch } = useQuery(
    gql`
      query Reviews($amount: Int!, $page: Int!) {
        reviews(amount: $amount, page: $page) {
          createdDate
          detail
          id
          product {
            categoryId
            description
            id
            images
            name
            price
            sku
          }
          productId
          rating
          updatedDate
          userId
          orderId
        }
      }
    `,
    { variables: { amount: 50, page: 1 } }
  );
  return { data, error, refetch };
}

export default useReviews;
