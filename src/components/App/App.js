import React, { useEffect, useReducer } from "react";
import moment from "moment";
import { useDebounce } from "use-debounce";
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

const REPOSITORIES = gql`
  query Repositories($queryString: String!, $perPage: Int) {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    search(query: $queryString, type: REPOSITORY, first: $perPage) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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
            licenseInfo {
              id
              name
              key
            }
          }
        }
      }
    }
  }
`;

const initialState = {
  nameSearch: "",
  license: {},
  currentPage: 1,
  total: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      const { currentPage } = action.payload;
      return {
        ...state,
        currentPage
      };
    case "SET_NAME_SEARCH":
      const { nameSearch } = action.payload;
      return {
        ...state,
        nameSearch,
        currentPage: 1
      };
    case "SET_lICENSE":
      const { license } = action.payload;
      return {
        ...state,
        license,
        currentPage: 1
      };
    default:
      throw new Error();
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { nameSearch, license, currentPage } = state;
  const [debouncedNameSearch] = useDebounce(nameSearch, 500);

  const createQuery = () => {
    const prevMonth = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");

    const licenseKey = (license && license.key) || "";

    return `language:javascript created:>=${prevMonth} ${
      licenseKey ? `license:${licenseKey}` : ""
    } ${debouncedNameSearch}`;
  };

  const { loading, error, data, refetch: refetchRepositories } = useQuery(
    REPOSITORIES,
    {
      variables: {
        queryString: createQuery(),
        perPage: 20
      }
    }
  );

  useEffect(() => {
    refetchRepositories();
  }, [license, debouncedNameSearch, refetchRepositories]);

  const handleLicenseChange = value => {
    dispatch({
      type: "SET_lICENSE",
      payload: {
        license: value
      }
    });
  };

  const handleNameSearchChange = value => {
    dispatch({
      type: "SET_NAME_SEARCH",
      payload: {
        nameSearch: value
      }
    });
  };

  const handlePageChange = value => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: {
        currentPage: value
      }
    });
  };

  return (
    <Layout>
      <Header>
        <Search
          handleNameSearchChange={handleNameSearchChange}
          nameSearch={nameSearch}
        />
        <Licenses license={license} handleLicenseChange={handleLicenseChange} />
      </Header>

      <main>
        {error && <div>Что-то пошло не так...</div>}

        {loading && <Loader />}

        {data && !loading && !error && (
          <>
            <List data={data.search.edges} />
            {/*<Pagination
              currentPage={currentPage}
              total={data.search.repositoryCount}
              itemsPerPage={PER_PAGE}
              handlePageChange={handlePageChange}
            />*/}
          </>
        )}
      </main>
    </Layout>
  );
};
