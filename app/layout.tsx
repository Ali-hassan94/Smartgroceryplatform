"use client";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

            <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 mt-12">
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About / Brand */}
                <div data-aos="fade-up" className="text-center md:text-left">
                  <h2 className="text-green-500 font-extrabold text-2xl mb-2">
                    Smart Grocery
                  </h2>
                  <p className="text-gray-400">
                    Your one-stop platform for smart, AI-driven grocery
                    shopping.
                  </p>
                </div>

                {/* Quick Links */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-center md:text-left"
                >
                  <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/products"
                        className="hover:text-green-500 transition-colors"
                      >
                        Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="/cart"
                        className="hover:text-green-500 transition-colors"
                      >
                        Cart
                      </a>
                    </li>
                    <li>
                      <a
                        href="/orders"
                        className="hover:text-green-500 transition-colors"
                      >
                        My Orders
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact / Social */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="text-center md:text-left"
                >
                  <h3 className="text-white font-semibold mb-3">Contact Us</h3>
                  <p className="text-gray-400">support@smartgrocery.com</p>
                  <div className="flex justify-center md:justify-start mt-2 space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557a9.828 9.828 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.916 4.916 0 00-8.379 4.482A13.939 13.939 0 011.671 3.149 4.917 4.917 0 003.195 9.723a4.903 4.903 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.919 4.919 0 004.593 3.417 9.867 9.867 0 01-6.102 2.104c-.395 0-.785-.023-1.17-.069a13.945 13.945 0 007.548 2.212c9.056 0 14.009-7.504 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.17.056 1.97.24 2.432.403a4.92 4.92 0 011.78 1.162 4.92 4.92 0 011.162 1.78c.163.462.347 1.262.403 2.432.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.056 1.17-.24 1.97-.403 2.432a4.92 4.92 0 01-1.162 1.78 4.92 4.92 0 01-1.78 1.162c-.462.163-1.262.347-2.432.403-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.056-1.97-.24-2.432-.403a4.92 4.92 0 01-1.78-1.162 4.92 4.92 0 01-1.162-1.78c-.163-.462-.347-1.262-.403-2.432C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.849c.056-1.17.24-1.97.403-2.432a4.92 4.92 0 011.162-1.78 4.92 4.92 0 011.78-1.162c.462-.163 1.262-.347 2.432-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.77.131 4.725.346 3.828.654c-.903.307-1.672.716-2.438 1.482-.766.766-1.175 1.535-1.482 2.438C-.346 5.275-.131 6.32-.072 7.602.013 8.882 0 9.291 0 12c0 2.709.013 3.118.072 4.398.059 1.282.274 2.327.582 3.224.307.903.716 1.672 1.482 2.438.766.766 1.535 1.175 2.438 1.482.897.308 1.942.523 3.224.582C8.882 23.987 9.291 24 12 24s3.118-.013 4.398-.072c1.282-.059 2.327-.274 3.224-.582.903-.307 1.672-.716 2.438-1.482.766-.766 1.175-1.535 1.482-2.438.308-.897.523-1.942.582-3.224.059-1.28.072-1.689.072-4.398s-.013-3.118-.072-4.398c-.059-1.282-.274-2.327-.582-3.224-.307-.903-.716-1.672-1.482-2.438-.766-.766-1.535-1.175-2.438-1.482C18.725.346 17.68.131 16.398.072 15.118.013 14.709 0 12 0z" />
                        <circle cx="12" cy="12" r="3.2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-8">
                <p className="text-center text-gray-400 py-4 text-sm">
                  © {new Date().getFullYear()} Smart Grocery Platform. All
                  Rights Reserved
                </p>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
