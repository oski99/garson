import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./toolbar.styles.scss";

const Toolbar = () => {
  let navigate = useNavigate();
  let { tableID } = useParams();
  return (
    <div className="toolbar">
      <h2 onClick={() => navigate(`/${tableID}/cart`)}>CART</h2>
    </div>
  );
};

export default Toolbar;
