import React, { Component } from "react";
import { selectOrdersChronological } from "../../redux/orders/orders.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import OrderPosition from "../../components/staff-components/order-position/order-position.component";
import "../orders-kitchen-page/orders-kitchen-page.styles.scss";

export class OrdersKitchenPage extends Component {
  render() {
    let { OrdersChronological } = this.props;
    return (
      <div className="orders-kitchen-page">
        <h1>Kitchen Page</h1>
        {OrdersChronological.map((order) => (
          <OrderPosition
            key={`${order.id}.${order.tableID}`}
            orderPosition={order}
            tableID={order.tableID}
            isServed={true}
            isForKitchen={true}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  OrdersChronological: selectOrdersChronological,
});

export default connect(mapStateToProps)(OrdersKitchenPage);
