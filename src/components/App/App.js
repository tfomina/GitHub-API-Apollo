import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "./../Layout";
import { List } from "./../List";
import { Loader } from "./../Loader";
import { Header } from "./../Header";

import "./App.css";

export const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setHasError(false);
    setIsLoading(true);

    try {
      const response = await axios(
        `https://api.github.com/search/repositories?q=${search}+language:javascript&sort=stars&order=desc`
      );
      setData(response.data.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleSearchChange = value => setSearch(value);

  return (
    <Layout>
      <Header handleSearchChange={handleSearchChange} />
      <main>
        {hasError && !isLoading && <div>Что-то пошло не так...</div>}

        {isLoading && !hasError && <Loader />}

        {data && !isLoading && !hasError && <List data={data} />}
      </main>
    </Layout>
  );
};
