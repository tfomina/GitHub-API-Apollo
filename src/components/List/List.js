import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

export const List = ({ data = [] }) => (
  <>
    {data && data.length ? (
      <ListGroup as="ul">
        {data.map(item => (
          <ListGroup.Item key={item.node_id} as="li">
            <b>{item.name}</b>{" "}
            <a href={item.html_url} target="_blank" rel="noopener noreferrer">
              {item.full_name}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      "Ничего не найдено"
    )}
  </>
);

List.propTypes = {
  data: PropTypes.array
};
