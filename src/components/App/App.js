import React, { useState, useEffect } from "react";
import moment from "moment";
import { Layout } from "./../Layout";
import { List } from "./../List";
import { Loader } from "./../Loader";
import { Header } from "./../Header";
import { Search } from "./../Search";
import { Licenses } from "./../Licenses";
import { Pagination } from "./../Pagination";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import "./App.css";

const PER_PAGE = 20;

const REPOSITORIES = gql`
  query Repositories($queryString: String!) {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    search(query: $queryString, type: REPOSITORY, first: 20) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const App = () => {
  const [nameSearch, setNameSearch] = useState("");
  const [license, setLicense] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    refetchRepositories();
  }, [license, nameSearch]);

  const createQuery = () => {
    const prevMonth = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");

    const licenseKey = (license && license.key) || "";

    return `language:javascript created:${prevMonth} ${
      licenseKey ? `license:${licenseKey}` : ""
    }`;
  };

  const { loading, error, data, refetch: refetchRepositories } = useQuery(
    REPOSITORIES,
    {
      variables: {
        queryString: createQuery()
      }
    }
  );

  return (
    <Layout>
      <Header>
        <Search
          handleNameSearchChange={setNameSearch}
          nameSearch={nameSearch}
        />
        <Licenses license={license} handleLicenseChange={setLicense} />
      </Header>

      <main>
        {error && <div>Что-то пошло не так...</div>}

        {loading && <Loader />}

        {data && !loading && !error && (
          <>
            <List data={data.search.edges} />
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
  );
};
