import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrdersContext from '../context/orders/OrdersContext';
import UserContext from '../context/user/UserContext';
import { getMyOrders } from '../context/orders/OrdersActions';

const OrderCard = ({ order }) => {
  const date = new Date(order.createdAt);
  return (
    <div className="p-4 rounded-md border border-base-300 bg-base-100 mb-3">
      <div className="flex justify-between text-sm">
        <div>
          <p className="font-semibold">Order #{order._id.slice(-6)}</p>
          <p className="text-gray-400">Placed {date.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Payment: {order.paymentMethod?.toUpperCase()}</p>
          <p className="text-sm">Status: {order.paymentStatus}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm">Ship to: {order.firstName} {order.lastName}, {order.apartment}, {order.city}</p>
        <p className="text-sm">Subtotal: ${Number(order?.cart?.subtotal || 0).toFixed(2)}</p>
      </div>
      <div className="mt-3 text-sm">
        <p className="font-medium mb-1">Items</p>
        <ul className="list-disc ml-6">
          {(order.cart?.items || []).map((it, idx) => {
            const p = it.productId;
            const name = typeof p === 'object' && p !== null ? p.name : String(p);
            return (
              <li key={idx}>
                x{it.quantity} – {name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default function MyOrders() {
  const { orders, ordersDispatch } = useContext(OrdersContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin', { state: { from: '/my-orders' } });
      return;
    }
    (async () => {
      setLoading(true);
      await getMyOrders(ordersDispatch);
      setLoading(false);
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">My Orders</h1>
          <Link to="/" className="btn btn-sm">Continue Shopping</Link>
        </div>
        {loading ? (
          <div className="text-center py-10">Loading your orders...</div>
        ) : orders && orders.length > 0 ? (
          orders.map((o) => <OrderCard key={o._id} order={o} />)
        ) : (
          <div className="text-center py-10">You have no orders yet.</div>
        )}
      </div>
    </div>
  );
}
