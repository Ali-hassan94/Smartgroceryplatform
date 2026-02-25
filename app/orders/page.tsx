"use client";

import { useEffect, useState } from "react";
import { get, put } from "../lib/api";
import ProtectedRoute from "../components/ProtectedRoute";
import RecommendedForYou from "../components/RecommendedForYou";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const role = localStorage.getItem("role");
        const data =
          role === "Admin" ? await get("/orders/all") : await get("/orders/my");

        setOrders(data);
        setIsAdmin(role === "Admin");
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const updated = await put(`/orders/update-status/${orderId}`, { status });

      setOrders(prev =>
        prev.map(o =>
          o.id === orderId ? { ...o, status: updated.status } : o,
        ),
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const statusColors = {
    Pending: "bg-green-100 text-green-800",
    Processing: "bg-green-200 text-green-900",
    Shipped: "bg-green-300 text-green-900",
    Delivered: "bg-green-500 text-white",
  };

  return (
    <ProtectedRoute adminOnly={false}>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700">
          {isAdmin ? "All Orders" : "My Orders"}
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {orders.map(o => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl border border-green-200 transition-all"
                >
                  {isAdmin && (
                    <p className="text-green-800 font-medium mb-1">
                      User: {o.userEmail}
                    </p>
                  )}
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                    Order #{o.id}
                  </p>
                  <p className="mb-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </p>
                  <p className="text-gray-500 mb-2 text-sm">
                    Date: {new Date(o.createdAt).toLocaleString()}
                  </p>

                  <ul className="mb-2">
                    {o.items?.map(i => (
                      <li
                        key={i.productName}
                        className="text-gray-700 dark:text-gray-200"
                      >
                        {i.productName} x {i.quantity}, Rs {i.price}
                      </li>
                    ))}
                  </ul>

                  {isAdmin && o.status !== "Delivered" && (
                    <button
                      onClick={() => updateStatus(o.id, "Delivered")}
                      className="mt-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Recommended for You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map((r, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg border border-green-200 transition-all"
                >
                  {r.name || r}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <RecommendedForYou orders={orders.flatMap(o => o.items || [])} />
    </ProtectedRoute>
  );
}
