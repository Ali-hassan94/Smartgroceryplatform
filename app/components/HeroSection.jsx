"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e",
  "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
  "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
            Fresh Grocery
            <br />
            Delivered Smartly
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Order fresh fruits, vegetables, and daily essentials. Smart AI
            suggestions. Fast delivery.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="#products"
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Shop Now
            </Link>

            <Link
              href="/auth/register"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-600 hover:text-white transition"
            >
              Create Account
            </Link>
          </div>
        </motion.div>

        {/* RIGHT AUTO SCROLL IMAGES */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
          >
            {[...images, ...images].map((img, i) => (
              <div
                key={i}
                className="min-w-[260px] h-[340px] rounded-3xl overflow-hidden shadow-xl"
              >
                <img
                  src={img}
                  alt="grocery"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-100 to-transparent" />
    </section>
  );
}
