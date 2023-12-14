import { gql, useQuery } from "@apollo/client";

function useReviews() {
  const { data, error, refetch } = useQuery(
    gql`
      query Reviews($amount: Int!, $page: Int!) {
        reviews(amount: $amount, page: $page) {
          createdDate
          detail
          id
          orderId
          productId
          rating
          updatedDate
          userId
        }
      }
    `,
    { variables: { amount: 50, page: 1 } }
  );
  return { data, error, refetch };
}

export default useReviews;
