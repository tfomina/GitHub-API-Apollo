import React from "react";
import PropTypes from "prop-types";

export const Layout = ({ children }) => (
  <div className="container">
    <div className="row">
      <div className="col">{children}</div>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};
