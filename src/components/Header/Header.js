import React from "react";
import PropTypes from "prop-types";
import { Search } from "../Search";

export const Header = ({ handleSearchChange }) => (
  <header className="d-flex flex-column flex-lg-row justify-content-between align-items-center flex-nowrap pb-3 pb-lg-0">
    <h1 className="py-3">GitHub</h1>
    <Search handleSearchChange={handleSearchChange} />
  </header>
);

Header.propTypes = {
  handleSearchChange: PropTypes.func
};
