import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Layout = ({ children }) => (
  <Container className="pb-4">
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.node
};
