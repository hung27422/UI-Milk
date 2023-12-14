import { gql, useQuery } from "@apollo/client";

function useQueryProduct() {
  const { data, error, refetch } = useQuery(
    gql`
      query Products($amount: Int!, $page: Int!) {
        products(amount: $amount, page: $page) {
          categoryId
          description
          id
          images
          name
          price
          sku
          category {
            description
            id
            name
          }
          reviews {
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
      }
    `,
    {
      variables: {
        amount: 50,
        page: 1,
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryProduct;
