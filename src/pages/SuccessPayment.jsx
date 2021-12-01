import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const SuccessPayment = () => {
  return (
    <div className="main-success">
      <div class="card">
        <div className="checkmark1">
          <i class="checkmark">✓</i>
        </div>
        <h1 className="hh1">Success</h1>
        <p className="pp1">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>

      <footer class="site-footer" id="footer">
        <Link to="/">
          <Button variant="outline-success">Back to main page</Button>
        </Link>
        <p class=" pp1 site-footer__fineprint" id="fineprint">
          Copyright ©2014 | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default SuccessPayment;
