import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "Recruiter") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // 🔄 Show loading UI instead of blank screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (user.role !== "Recruiter") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;