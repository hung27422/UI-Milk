import { gql, useQuery } from "@apollo/client";

function useQueryProductsByName({ name }) {
  const { data, error, refetch } = useQuery(
    gql`
      query ProductsByName($name: String!, $amount: Int!, $page: Int!) {
        productsByName(name: $name, amount: $amount, page: $page) {
          category {
            description
            id
            name
          }
          categoryId
          description
          id
          images
          name
          price
          sku
        }
      }
    `,
    {
      variables: {
        name,
        amount: 50,
        page: 1,
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryProductsByName;
