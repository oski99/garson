import React from "react";
import "./menu-position.styles.scss";
import CustomButton from "../../custom-button/custom-button.component";
import { connect } from "react-redux";
import { addPosition } from "../../../redux/cart/cart.actions";
import { useParams } from "react-router";
import { convertPathTableID } from "../../../constants";

const MenuPosition = ({ position, addPosition }) => {
  const { positionName, id, imgUrl, description, price } = position;
  const { tableID } = useParams();
  return (
    <div className="menu-position">
      <h1>{positionName}</h1>
      <img className="image" src={imgUrl} alt="food pic" />
      <h2>{description}</h2>
      <h2>price: {price}</h2>
      <CustomButton
        onClick={() =>
          addPosition({
            id,
            positionName,
            price,
            tableID: convertPathTableID(tableID),
          })
        }
      >
        add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addPosition: (item) => dispatch(addPosition(item)),
});

export default connect(null, mapDispatchToProps)(MenuPosition);
