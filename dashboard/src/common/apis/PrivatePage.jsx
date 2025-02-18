import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return children;
}