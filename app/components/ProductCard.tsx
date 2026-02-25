"use client";

import { post } from "../lib/api";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = async () => {
    await post("/cart/add", {
      productId: product.id,
      quantity: 1,
    });

    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition group"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        {product.imageUrl && (
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-40 sm:h-44 md:h-48 object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>

        <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>

        <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">
          Rs {product.price}
        </p>
      </div>

      {/* BUTTON */}
      <div className="px-4 pb-4">
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          className="
            w-full
            bg-green-600 text-white
            py-2 rounded-xl
            text-sm sm:text-base
            shadow
            sm:opacity-0 sm:group-hover:opacity-100
            transition
          "
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
