import React from "react";
import PropTypes from "prop-types";
import { Stars } from "./Stars";

export const Item = ({ item = {} }) => (
  <li className="list-group-item d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center flex-nowrap">
    <div>
      <b>{item.name}</b>{" "}
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {item.name}
      </a>
    </div>
    <Stars count={item.stargazers.totalCount} />
  </li>
);

Item.propTypes = {
  data: PropTypes.object
};
