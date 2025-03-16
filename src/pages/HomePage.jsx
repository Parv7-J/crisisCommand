import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}

      <nav className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-2xl font-bold">Nexus</h1>
        <div className="space-x-6">
          <a href="#" className="hover:text-orange-400">
            Home
          </a>
          <a href="#" className="hover:text-orange-400">
            About
          </a>
          <a href="#" className="hover:text-orange-400">
            Services
          </a>
          <a href="#" className="hover:text-orange-400">
            Contact
          </a>
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="h-screen flex flex-col justify-center items-center text-center p-6"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-5xl font-bold max-w-3xl leading-tight">
          Empowering Collaboration for Effective Disaster Response
        </h2>
        <p className="mt-4 text-lg max-w-2xl">
          A centralized platform connecting government authorities, NGOs,
          medical teams, and logistics providers.
        </p>
        <button className="mt-6 bg-orange-500 px-6 py-3 text-lg rounded-lg hover:bg-orange-600 transition">
          Get Involved
        </button>
      </div>

      {/* Disaster Monitoring */}
      <section className="p-12 bg-gray-100 text-gray-900">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/disaster.jpg"
            alt="Disaster Response"
            className="w-full md:w-1/2 rounded-lg"
          />
          <div>
            <h3 className="text-3xl font-bold">Rapid Response Coordination</h3>
            <p className="mt-4 text-lg">
              The website serves as a centralized platform for stakeholders to
              access critical information and collaborate on resource
              allocation.
            </p>
            <button className="mt-4 bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition">
              Take Action
            </button>
          </div>
        </div>
      </section>

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
          <p>&copy; 2025 Nexus. All Rights Reserved.</p>
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

export default HomePage;
