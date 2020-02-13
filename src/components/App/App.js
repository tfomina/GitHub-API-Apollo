import React, { useState, useEffect } from "react";
import { Layout } from "./../Layout";
import { List } from "./../List";
import { Loader } from "./../Loader";

export const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const result = await fetch(
        "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc"
      );
      const repositories = await result.json();
      setData(repositories.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      {isError && <div>Что-то пошло не так...</div>}

      {isLoading && <Loader />}

      {data && !!data.length && <List data={data} />}
    </Layout>
  );
};
