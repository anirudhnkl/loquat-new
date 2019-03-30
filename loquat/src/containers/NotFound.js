import React from "react";
import { Button } from 'react-bootstrap';
import "./NotFound.css";

export default () =>
  <div className="NotFound">
    <h3>Sorry, page not found!</h3>
    <br />
    <Button variant="primary" href="/">Go to Home</Button>
  </div>;