import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Layout = props => {
  return (
    <Container className="pb-4">
      <Row>
        <Col>
          <h1 className="py-3">GitHub</h1>
          <main>{props.children}</main>
        </Col>
      </Row>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
