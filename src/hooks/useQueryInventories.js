import { gql, useQuery } from "@apollo/client";

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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0NTliNDNjNC0xYzI5LTQ1OTUtOWM5NS00YjVkOThmYjNiYjgiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjQ1OUI0M0M0LTFDMjktNDU5NS05Qzk1LTRCNUQ5OEZCM0JCOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQxNTkxMjIxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.ZenEp9rwBBLBhvp6GDj7WLAHYkXPu3vKbbJ_HBoQnuaAMrOCHUBr-VCfS6OkB6t6xHHvidguWwdcxqC2SeUuoQ`,
        },
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryInventories;
