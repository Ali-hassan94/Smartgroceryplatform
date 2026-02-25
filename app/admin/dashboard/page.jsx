"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 sm:px-8 lg:px-12 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800"
        >
          Admin Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products */}
          <Link href="/admin/products" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow hover:shadow-2xl transition cursor-pointer"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Manage Products
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Add, update, delete grocery items
              </p>
              <div className="mt-4 text-green-600 font-semibold">Open →</div>
            </motion.div>
          </Link>

          {/* Orders */}
          <Link href="/admin/orders" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow hover:shadow-2xl transition cursor-pointer"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Manage Orders
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Track and update order status
              </p>
              <div className="mt-4 text-blue-600 font-semibold">Open →</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
