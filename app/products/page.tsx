"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { get } from "../lib/api";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });

    async function fetchProducts() {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    }

    async function fetchRecs() {
      try {
        const recs = await get("/recommendations", { orders: [] });
        setRecommendations(recs.frequentlyBought || []);
      } catch {
        setRecommendations([]);
      }
    }

    fetchProducts();
    fetchRecs();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1
        className="text-4xl font-extrabold mb-8 text-green-700 text-center"
        data-aos="fade-down"
      >
        All Products
      </h1>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {products.map((p: any) => (
          <motion.div
            key={p.id}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(34,197,94,0.3)",
            }}
            className="rounded-2xl border border-green-200 shadow-lg hover:shadow-2xl transition-all"
            data-aos="fade-up"
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      {recommendations.length > 0 && (
        <div className="mt-10">
          <h2
            className="text-2xl font-bold mb-4 text-green-700 text-center"
            data-aos="fade-down"
          >
            Recommended for you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((r, i) => (
              <motion.div
                key={i}
                data-aos="fade-up"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(34,197,94,0.2)",
                }}
                className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow border border-green-200 transition-all text-center"
              >
                <p className="text-gray-800 dark:text-gray-200">
                  {r.name || r}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
