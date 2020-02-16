import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const token = "d7e5de98c1bb37b14e9e7a73b63c33e52eb1807d";

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }
  });

  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;
