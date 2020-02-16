import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "./../Layout";
import { List } from "./../List";
import { Loader } from "./../Loader";
import { Header } from "./../Header";
import { Search } from "./../Search";
import { Licenses } from "./../Licenses";
import { Pagination } from "./../Pagination";

import "./App.css";

const PER_PAGE = 20;

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [license, setLicense] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setHasError(false);
    setIsLoading(true);

    try {
      const prevMonth = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");

      const licenseKey = (license && license.key) || "";

      const url = `https://api.github.com/search/repositories?q=${nameSearch}+in:name+language:javascript+created:${prevMonth}${
        licenseKey ? `+license:${licenseKey}` : ""
      }&sort=stars&order=desc&page=${currentPage}&per_page=${PER_PAGE}`;

      const response = await axios(url);
      setData(response.data.items);
      setTotal(response.data.total_count);
    } catch (error) {
      setHasError(true);
      setData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [license, nameSearch, currentPage]);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Header>
          <Search
            handleNameSearchChange={setNameSearch}
            nameSearch={nameSearch}
          />
          <Licenses license={license} handleLicenseChange={setLicense} />
        </Header>

        <main>
          {hasError && <div>Что-то пошло не так...</div>}

          {isLoading && <Loader />}

          {data && !isLoading && !hasError && (
            <>
              <List data={data} />
              <Pagination
                currentPage={currentPage}
                total={total}
                itemsPerPage={PER_PAGE}
                handlePageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </Layout>
    </ApolloProvider>
  );
};
