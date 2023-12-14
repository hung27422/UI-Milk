import { gql, useQuery } from "@apollo/client";

function useQueryPoint() {
  const userIdLocal = localStorage.getItem("userId");

  const { data, error, refetch } = useQuery(
    gql`
      query PointByUserId($userId: String!) {
        pointByUserId(userId: $userId) {
          id
          point
          userId
        }
      }
    `,
    {
      variables: {
        userId: userIdLocal,
      },
      pollInterval: 5000,
    }
  );
  return { data, error, refetch };
}

export default useQueryPoint;
