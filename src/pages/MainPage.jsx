import { Link } from "react-router-dom";

const MainPage = ({ children }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}

      <nav className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-2xl font-bold">CrisisCommand</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-orange-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-orange-400">
            About
          </Link>
          <Link to="/services" className="hover:text-orange-400">
            Services
          </Link>
          <Link to="/contactpage" className="hover:text-orange-400">
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {children}

      {/* Support Network */}
      <section className="p-12">
        <h3 className="text-3xl font-bold text-center">Support Network</h3>
        <p className="text-center mt-4 max-w-3xl mx-auto">
          Real-time disaster overview, prioritization dashboard, and resource
          tracking.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="flex justify-between">
          <p>&copy; 2025 CrisisCommand. All Rights Reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-orange-400">
              Twitter
            </a>
            <a href="#" className="hover:text-orange-400">
              Facebook
            </a>
            <a href="#" className="hover:text-orange-400">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
