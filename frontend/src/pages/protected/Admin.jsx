import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../utils/helper.js";
import OrderList from "../../components/admin/OrderList.jsx";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //   Recieve data
  async function getAllCustomersOders() {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/order/all-order`);
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCustomersOders();
  }, []);

  if (loading === true) {
    return (
      <div className="grid place-items-center py-24">
        <h1 className="text-3xl text-gray-500 tracking-wider animate-pulse">
          Getting orders
        </h1>
      </div>
    );
  }

  return <OrderList orders={orders} />;
};

export default Admin;
