export default function RecommendationCard({ recommendation }) {
  return (
    <div className="bg-yellow-100 p-3 rounded shadow hover:shadow-lg transition">
      <p className="font-semibold">Product #{recommendation.productId}</p>
      <p className="text-sm text-gray-700">
        Suggested Quantity: {recommendation.suggestedQuantity}
      </p>
    </div>
  );
}
