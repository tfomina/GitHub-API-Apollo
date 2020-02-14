import React from "react";
import PropTypes from "prop-types";

export const Header = ({ children }) => (
  <header className="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center flex-nowrap pb-3 pb-lg-0">
    <h1 className="py-3">GitHub</h1>
    {children}
  </header>
);

Header.propTypes = {
  children: PropTypes.node
};
