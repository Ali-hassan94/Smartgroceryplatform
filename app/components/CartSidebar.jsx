"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar({ checkout }) {
  const { cart, removeFromCart, updateQty } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-0 right-0 w-96 h-full bg-white/90 backdrop-blur-xl shadow-2xl p-6 z-50"
      >
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center mt-20"
          >
            Cart is empty 🛒
          </motion.p>
        ) : (
          <div className="space-y-4">
            {cart.map(i => (
              <motion.div
                key={i.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-4 shadow flex justify-between items-start"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{i.name}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Qty</span>
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={e =>
                        updateQty(i.productId, parseInt(e.target.value))
                      }
                      className="w-14 border rounded-lg p-1 text-center"
                    />
                  </div>

                  <p className="font-medium text-green-600">
                    Rs {i.price * i.qty}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(i.productId)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t bg-white/80 backdrop-blur-xl">
          <div className="flex justify-between text-lg font-bold mb-3">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={checkout}
            className="w-full bg-green-600 text-white py-3 rounded-xl text-lg shadow-lg"
          >
            Checkout
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
