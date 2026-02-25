"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { get, post, del } from "../../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const loadProducts = async () => {
    const data = await get("/products");
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submit = async () => {
    if (!form.name || !form.price) return;
    await post("/products", form);
    setForm({ name: "", price: "", category: "", imageUrl: "" });
    loadProducts();
  };

  const deleteProduct = async id => {
    await del(`/products/${id}`);
    loadProducts();
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 lg:px-10 py-8">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800"
        >
          Admin Products
        </motion.h1>

        {/* Add Product Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              placeholder="Product name"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Price"
              type="number"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <input
              placeholder="Category"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
            <input
              placeholder="Image URL"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>

          {/* Image Preview */}
          {form.imageUrl && (
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={form.imageUrl}
              className="mt-4 h-40 w-full object-cover rounded-xl"
            />
          )}

          <button
            onClick={submit}
            className="mt-5 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
          >
            Add Product
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {products.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow hover:shadow-2xl transition overflow-hidden"
              >
                {p.imageUrl && (
                  <img src={p.imageUrl} className="h-44 w-full object-cover" />
                )}

                <div className="p-4">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-gray-500 text-sm">{p.category}</p>
                  <p className="text-green-600 font-semibold mt-1">
                    Rs {p.price}
                  </p>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
