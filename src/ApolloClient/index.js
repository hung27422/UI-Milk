import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:8802/v1/graphql",
  cache: new InMemoryCache(),
});
export { gql, client };
