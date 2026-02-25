"use client";

import { useEffect, useState } from "react";
import { post } from "../lib/api";
import RecommendationCard from "./RecommendationCard";

export default function RecommendedForYou({ orders }: { orders: any[] }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    setLoading(true);

    post("/recommendations", { orders })
      .then(res => {
        console.log("AI recommendation response:", res);
        setData(res);
      })
      .catch(err => {
        console.error("Recommendation error:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [orders]);

  if (loading) {
    return <p className="mt-6 text-gray-500">Loading recommendations...</p>;
  }

  if (!data) return null;

  return (
    <div className="mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>

      {data.frequentlyBought?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Frequently bought</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.frequentlyBought.map((p: string) => (
              <div
                key={p}
                className="bg-white p-4 rounded shadow text-center hover:shadow-md transition"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.relatedProducts && (
        <div>
          <h3 className="font-semibold mb-2">Often bought together</h3>

          {Object.entries(data.relatedProducts).map(([product, items]: any) => (
            <div key={product} className="mb-4">
              <p className="font-medium mb-2">{product}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {items.map((item: any, i: number) => (
                  <RecommendationCard key={i} recommendation={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
