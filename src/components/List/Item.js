import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import { Stars } from "./Stars";

export const Item = ({ item = {} }) => (
  <ListGroup.Item as="li" className="item">
    <div>
      <b>{item.name}</b>{" "}
      <a href={item.html_url} target="_blank" rel="noopener noreferrer">
        {item.full_name}
      </a>
    </div>
    <Stars count={item.stargazers_count} />
  </ListGroup.Item>
);

Item.propTypes = {
  data: PropTypes.object
};
