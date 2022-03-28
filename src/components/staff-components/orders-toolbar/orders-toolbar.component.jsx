import React from "react";
import CustomButton from "../../custom-button/custom-button.component";
import { auth } from "../../../firebase/firebase.utils";
import { useNavigate } from "react-router";
import "./orders-toolbar.styles.scss";

const OrdersToolbar = () => {
  let navigate = useNavigate();
  return (
    <div className="orders-toolbar">
      <div className="buttons">
        <CustomButton
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign out
        </CustomButton>
        <CustomButton onClick={() => navigate("/kitchen")}>
          KITCHEN PAGE
        </CustomButton>
      </div>
    </div>
  );
};

export default OrdersToolbar;
