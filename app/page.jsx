"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import HeroSection from "./components/HeroSection";
import { get } from "./lib/api";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    get("/products")
      .then(setProducts)
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <HeroSection />

      {/* PRODUCTS SECTION */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-700 text-center">
          Fresh Grocery Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
