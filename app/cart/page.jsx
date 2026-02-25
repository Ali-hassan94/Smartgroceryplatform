"use client";

import { useEffect, useState } from "react";
import { get } from "../lib/api"; // assumes JWT attached
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });

    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);

    async function fetchRecs() {
      if (saved.length === 0) return;
      try {
        const recs = await get("/recommendations", { orders: saved });
        setRecommendations(recs.frequentlyBought || []);
      } catch {
        setRecommendations([]);
      }
    }

    fetchRecs();
  }, []);

  const removeItem = id => {
    const updated = cart.filter(i => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1
        className="text-4xl font-extrabold mb-8 text-center text-green-700"
        data-aos="fade-down"
      >
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Cart is empty</p>
      ) : (
        <>
          <AnimatePresence>
            <div className="space-y-4">
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg flex justify-between items-center hover:shadow-2xl border border-green-200 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700">
                      Rs {item.price * item.qty}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#EF4444" }}
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          <div
            className="mt-6 text-right bg-green-50 dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-green-200"
            data-aos="fade-up"
          >
            <p className="text-xl font-bold text-green-800">
              Total: Rs {total}
            </p>
            <a
              href="/checkout"
              className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold text-lg shadow hover:shadow-2xl transition-all"
            >
              Checkout
            </a>
          </div>
        </>
      )}

      {/* Recommended Products */}
      {recommendations.length > 0 && (
        <div className="mt-10">
          <h2
            className="text-2xl font-bold mb-4 text-green-700"
            data-aos="fade-down"
          >
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendations.map((r, i) => (
              <motion.div
                key={i}
                data-aos="fade-up"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(34,197,94,0.3)",
                }}
                className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow border border-green-200 transition-all flex items-center justify-center text-center"
              >
                <p className="text-gray-800 dark:text-gray-200">{r}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
