import { useContext, useEffect,useState } from "react";
import { deleteOrder, getOrders } from "../context/orders/OrdersActions";
import OrdersContext from "../context/orders/OrdersContext";
import { formatDistanceToNow } from "date-fns";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
function OrderList() {
  const { orders, ordersDispatch } = useContext(OrdersContext);
  const [showViewBox,setShowViewBox]=useState(false)
  const [showEditBox,setShowEditBox]=useState(false)
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      if (response.success) {
        ordersDispatch({
          type: "SET_ORDERS",
          payload: response.data,
        });
      }
    };
    fetchOrders();
    console.log(orders);
  }, []);
  const handleDelete = async (order) => {
    const response = await deleteOrder(order._id);
    if(response.success){
      ordersDispatch({
        type: "DELETE_ORDER",
        payload: order._id
      })
    }
  };
  const handleOrderEdit = async (order) => {};

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Customer Name</th>
            <th>Email</th>
            <th>Placed</th>
          </tr>
        </thead>
        <tbody>
          {orders
            ? orders.map((order, index) => (
                <tr key={index} className="hover text-lg">
                  <td>
                    {order.firstName} {order.lastName}
                  </td>
                  <td>{order.email}</td>
                  <td>
                    {order.createdAt
                      ? formatDistanceToNow(new Date(order.createdAt)) + " ago"
                      : "Unknown"}
                  </td>
                  <td>
                    <button>
                      <FaEye color="gray" size={20} />
                    </button>
                    <button
                      onClick={() => handleOrderEdit(order)}
                      className="ml-3"
                    >
                      <FaEdit color="gray" size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(order)}
                      className="ml-3"
                    >
                      <FaTrash color="gray" size={18} />
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>

    </div>
  );
}

export default OrderList;
