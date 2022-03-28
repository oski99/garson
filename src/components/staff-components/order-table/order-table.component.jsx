import { React, useState } from "react";
import "./order-table.styles.scss";
import OrderPosition from "../order-position/order-position.component";
import { connect } from "react-redux";
import CustomButton from "../../custom-button/custom-button.component";
import { removeServed } from "../../../redux/orders/orders.actions";
import MenuPopup from "../menu-popup/menu-popup.component";

const OrderTable = ({ tableID, orders, served, isFetching, removeServed }) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="order-table">
      <div className="header">
        <h1>Table {tableID} </h1>
        <CustomButton
          onClick={() => {
            setButtonPopup(!buttonPopup);
          }}
        >
          {!buttonPopup ? "Add position" : "Hide menu"}
        </CustomButton>
      </div>
      <MenuPopup
        tableID={tableID}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      ></MenuPopup>
      <div className="order-header"></div>

      {!isFetching
        ? Object.keys(orders).map((key) => {
            let arr = [];
            for (let i = 0; i < orders[key].quantity; i++)
              arr.push(
                <OrderPosition
                  key={!i ? orders[key].id : `${orders[key].id}.${i}`}
                  orderPosition={orders[key]}
                  tableID={tableID}
                ></OrderPosition>
              );
            return arr;
          })
        : null}
      <div className="order-header"></div>
      {!isFetching
        ? Object.keys(served).map((key) => {
            let arr = [];
            for (let i = 0; i < served[key].quantity; i++)
              arr.push(
                <OrderPosition
                  key={!i ? served[key].id : `${served[key].id}.${i}`}
                  orderPosition={served[key]}
                  tableID={tableID}
                  isServed={true}
                ></OrderPosition>
              );
            return arr;
          })
        : null}
      {!isFetching && Object.keys(served).length ? (
        <>
          <CustomButton
            onClick={() => {
              removeServed(tableID);
            }}
          >
            cash paid
          </CustomButton>
          <div className="order-header"></div>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders.orders[ownProps.tableID],
    served: state.orders.served[ownProps.tableID],
    isFetching: state.orders.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeServed: (item) => dispatch(removeServed(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);
