import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <AuthForm isSignUp={true} />
        <p className="mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
