import { gql, useQuery } from "@apollo/client";

function useAvailableDiscount({ birthday, specialDay, total }) {
  const { data } = useQuery(
    gql`
      query AvailableDiscounts(
        $condition: orderDiscountConditionDtoInput!
        $amount: Int!
        $page: Int!
      ) {
        availableDiscounts(
          condition: $condition
          amount: $amount
          page: $page
        ) {
          activeDate
          amount
          birthdayCondition
          code
          condition
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
        condition: {
          birthday,
          specialDay,
          total,
        },
        amount: 50,
        page: 1,
      },
    }
  );
  return { data };
}

export default useAvailableDiscount;
