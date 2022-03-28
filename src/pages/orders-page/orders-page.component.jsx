import React from "react";

import {
  fetchOrdersStartAsync,
  fetchServedStartAsync,
} from "../../redux/orders/orders.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsFetching } from "../../redux/orders/orders.selectors";

import OrderTable from "../../components/staff-components/order-table/order-table.component";
import "./orders-page.styles.scss";

import { TABLES_NUMBER } from "../../constants";
import OrdersToolbar from "../../components/staff-components/orders-toolbar/orders-toolbar.component";

class OrdersPage extends React.Component {
  componentDidMount() {
    const { fetchOrdersStartAsync, fetchServedStartAsync } = this.props;
    fetchOrdersStartAsync();
    fetchServedStartAsync();
  }
  render() {
    let { isFetching } = this.props;

    function tablesRender() {
      let tables = [];

      for (let i = 1; i <= TABLES_NUMBER; i++) {
        tables.push(<OrderTable key={i} tableID={i} />);
      }
      return tables;
    }

    return (
      <div className="orders-page">
        <OrdersToolbar />

        {!isFetching ? tablesRender() : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrdersStartAsync: () => dispatch(fetchOrdersStartAsync()),
  fetchServedStartAsync: () => dispatch(fetchServedStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
