import React from "react";
import PropTypes from "prop-types";
import { Search } from "../Search";

export const Header = ({ handleSearchChange }) => (
  <header>
    <h1 className="py-3">GitHub</h1>
    <Search handleSearchChange={handleSearchChange} />
  </header>
);

Header.propTypes = {
  handleSearchChange: PropTypes.func
};
