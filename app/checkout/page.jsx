"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { post } from "../lib/api";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage("Cart is empty");
      return;
    }
    if (!address.trim()) {
      setMessage("Please enter your address");
      return;
    }

    setLoading(true);
    try {
      await post("/orders/checkout", { address, paymentMethod });
      clearCart();
      window.location.href = "/orders";
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-6 max-w-xl mx-auto"
    >
      <h1
        className="text-4xl font-extrabold mb-8 text-center text-green-700"
        data-aos="fade-down"
      >
        Checkout
      </h1>

      <motion.div
        data-aos="fade-up"
        className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-green-200 flex flex-col gap-4"
      >
        <label className="block text-gray-700 dark:text-gray-200 font-medium">
          Address
        </label>
        <textarea
          className="w-full border border-green-300 focus:ring-2 focus:ring-green-400 p-3 rounded-xl outline-none transition-all placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Enter your delivery address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <label className="block text-gray-700 dark:text-gray-200 font-medium">
          Payment Method
        </label>
        <select
          className="w-full border border-green-300 focus:ring-2 focus:ring-green-400 p-3 rounded-xl outline-none transition-all dark:bg-gray-800 dark:text-gray-200"
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option>Cash on Delivery</option>
          <option>Card</option>
        </select>

        <motion.button
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 10px 20px rgba(34,197,94,0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCheckout}
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded-2xl font-semibold text-lg transition-all"
        >
          {loading ? "Processing..." : "Place Order"}
        </motion.button>

        {message && (
          <p className="mt-4 text-red-500 font-medium text-center">{message}</p>
        )}
      </motion.div>

      {cart.length > 0 && (
        <motion.div
          data-aos="fade-up"
          className="mt-10 bg-green-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-green-200"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">Your Cart</h2>
          <ul className="flex flex-col gap-2">
            {cart.map(item => (
              <li
                key={item.productName}
                className="flex justify-between p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-green-100"
              >
                <span>
                  {item.productName} x {item.quantity}
                </span>
                <span>Rs {item.price}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
