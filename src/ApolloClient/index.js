import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:32774/graphql/",
  cache: new InMemoryCache(),
});
export { gql, client };
