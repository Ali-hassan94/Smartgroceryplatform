"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-green-600">
            Smart
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-gray-800">
            Grocery
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/orders">Orders</NavLink>

          {/* CART */}
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </Link>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {role === "Admin" && <NavLink href="/admin/dashboard">Admin</NavLink>}

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1.5 rounded-md"
            >
              Logout
            </button>
          ) : (
            <NavLink href="/auth/login">Login</NavLink>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4 space-y-3 bg-white border-t"
          >
            <MobileLink href="/" onClick={() => setOpen(false)}>
              Home
            </MobileLink>

            <MobileLink href="/orders" onClick={() => setOpen(false)}>
              Orders
            </MobileLink>

            <MobileLink href="/cart" onClick={() => setOpen(false)}>
              Cart ({cart.length})
            </MobileLink>

            {role === "Admin" && (
              <MobileLink
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
              >
                Admin
              </MobileLink>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <MobileLink
                href="/auth/login"
                onClick={() => setOpen(false)}
              >
                Login
              </MobileLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, children }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        href={href}
        className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block w-full text-gray-700 font-medium py-2"
    >
      {children}
    </Link>
  );
}
