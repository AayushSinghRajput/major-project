import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RefreshRedirectWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;

    const isRefresh = navType === "reload";
    const notOnHome = location.pathname !== "/";

    if (isRefresh && !user && notOnHome) {
      navigate("/");
    }
  }, []);

  return children;
}
