import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("volunteer"); // "volunteer" or "department"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deptId, setDeptId] = useState("");
  const [deptPassword, setDeptPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/08/rescue-workers-kerala-1534592624.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-md">
        <div className="flex justify-around mb-6 border-b pb-2">
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
              activeTab === "volunteer"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("volunteer")}
          >
            Volunteer Login
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
              activeTab === "department"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("department")}
          >
            Department Login
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {activeTab === "volunteer" ? (
          <form onSubmit={() => navigate("/dashboard")} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md"
            >
              Login
            </button>
            <p className="text-center mt-2 text-gray-600">
              New here?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={() => navigate("/dashboard")} className="space-y-4">
            <input
              type="text"
              placeholder="Department ID"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
              value={deptId}
              onChange={(e) => setDeptId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
              value={deptPassword}
              onChange={(e) => setDeptPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md"
            >
              Login
            </button>
            <p className="text-center mt-2 text-gray-600">
              No department login?{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Request Registration
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
