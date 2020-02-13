import React from "react";
import PropTypes from "prop-types";

export const Search = ({ handleSearchChange, value }) => (
  <input
    type="text"
    name="search"
    placeholder="Введите что-нибудь..."
    onChange={e => handleSearchChange(e.target.value)}
    className="form-control mx-5"
    value={value}
  />
);

Search.propTypes = {
  handleSearchChange: PropTypes.func,
  value: PropTypes.any
};
