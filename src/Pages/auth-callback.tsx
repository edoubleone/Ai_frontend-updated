import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setAuthenticated(token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [token, setAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-defaultBlue"></div>
    </div>
  );
};

export default OAuthCallback;
