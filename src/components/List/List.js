import React from "react";
import PropTypes from "prop-types";
import { Item } from "./Item";

export const List = ({ data = [] }) => (
  <>
    {data && data.length ? (
      <ul className="list-group mb-4">
        {data.map(item => (
          <Item key={item.node.id} item={item.node} />
        ))}
      </ul>
    ) : (
      "Ничего не найдено"
    )}
  </>
);

List.propTypes = {
  data: PropTypes.array
};
