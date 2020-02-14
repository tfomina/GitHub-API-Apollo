import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Layout } from "./../Layout";
import { List } from "./../List";
import { Loader } from "./../Loader";
import { Header } from "./../Header";
import { Search } from "./../Search";
import { Licenses } from "./../Licenses";
import { AppPagination as Pagination } from "./../Pagination";

import "./App.css";

const PER_PAGE = 20;

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
  );
};
