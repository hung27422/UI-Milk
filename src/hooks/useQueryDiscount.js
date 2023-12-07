import { gql, useQuery } from "@apollo/client";

function useQueryDiscount() {
  const { data, error, refetch } = useQuery(
    gql`
      query Discounts($amount: Int!, $page: Int!) {
        discounts(amount: $amount, page: $page) {
          activeDate
          amount
          birthdayCondition
          code
          description
          expireDate
          id
          quantity
          specialDayCondition
          totalOverCondition
          type
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

export default useQueryDiscount;
