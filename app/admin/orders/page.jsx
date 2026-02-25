
"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { get, put } from "../../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data =
        localStorage.getItem("role") === "Admin"
          ? await get("/orders/all")
          : await get("/orders/my");
      setOrders(data);
    } catch (e) {
      console.error("Failed to load orders", e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await put(`/orders/update-status/${orderId}`, { status });
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status } : o)),
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Orders Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {orders.map(o => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Order ID: <span className="font-normal">{o.id}</span>
                </p>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  User: <span className="font-normal">{o.userEmail}</span>
                </p>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[o.status]}`}
                  >
                    {o.status}
                  </span>
                </p>

                <select
                  className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
                  value={o.status}
                  onChange={e => updateStatus(o.id, e.target.value)}
                >
                  {Object.keys(statusColors).map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
