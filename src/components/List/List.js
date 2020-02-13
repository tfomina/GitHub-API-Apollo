import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import { Item } from "./Item";

export const List = ({ data = [] }) => (
  <>
    {data && data.length ? (
      <ListGroup as="ul">
        {data.map(item => (
          <Item key={item.node_id} item={item} />
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
