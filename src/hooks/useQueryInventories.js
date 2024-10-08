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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAyODI1ODczLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.o5ruNE0RWtXFGb_0xstZHSpIoZHmTy9xBOgusLM-9NYsHlrOCQsAU0xJNEmlNIwnQiapx4dQkrcFefzrJ6NXnw`,
        },
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryInventories;
