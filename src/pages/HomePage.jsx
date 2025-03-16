import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div
        className="h-screen flex flex-col justify-center items-center text-center p-6"
        style={{
          backgroundImage: null, // Use a direct image URL
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
        <Link
          to="/login"
          className="mt-6 bg-orange-500 px-6 py-3 text-lg rounded-lg hover:bg-orange-600 transition"
        >
          Get Involved
        </Link>
      </div>
      {/* Disaster Monitoring */}
      <section className="p-12 bg-gray-100 text-gray-900">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfK7ZKba5Rhu0AVDy3FkfwVpC6fJDdoyjelQ&s"
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
            <div className="mt-4">
              <Link
                to="/login"
                className="mt-4 bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Take Action
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
