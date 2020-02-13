import React, { useState } from "react";
import { Layout } from "./../Layout";
import { Loader } from "./../Loader";

export const App = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      {isError && <div>Что-то пошло не так...</div>}

      {isLoading && <Loader />}

      <>Тут будут данные</>
    </Layout>
  );
};
