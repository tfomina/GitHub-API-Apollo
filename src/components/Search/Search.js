import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

export const Search = ({ handleSearchChange }) => (
  <Form.Control
    type="text"
    name="search"
    placeholder="Введите что-нибудь..."
    onChange={e => handleSearchChange(e.target.value)}
    className="search mx-5"
  />
);

Search.propTypes = {
  handleSearchChange: PropTypes.func
};
