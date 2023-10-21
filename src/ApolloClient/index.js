import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:32771/graphql/",
  cache: new InMemoryCache(),
});
export { gql, client };
