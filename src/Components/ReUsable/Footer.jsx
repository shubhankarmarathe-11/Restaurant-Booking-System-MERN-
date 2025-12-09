import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="min-h-62 shadow-2xl bg-gray-200 rounded-2xl mt-5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
          {/* Logo + About */}
          <div>
            <h2 className="text-2xl font-bold text-black">🍴 DemoRestaurant</h2>
            <p className="mt-4 text-sm leading-6">
              Serving delicious Indian, Fast Food & Desserts with love. Fresh
              ingredients, authentic taste — made just for you!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={"/"} className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/buyfood"}
                  className="hover:text-blue-400 transition"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to={"/booktable"}
                  className="hover:text-blue-400 transition"
                >
                  Table Booking
                </Link>
              </li>
              <li>
                <Link to={"About"} className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Street, Pune, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@restaurant.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-sm text-black my-5 border-t border-gray-700 pt-5">
          © {new Date().getFullYear()} DemoRestaurant — All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export { Footer };
