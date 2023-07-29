import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const APIURL = useSelector((state) => state.APIURL.url);
  const [is_authenticate, setAuthed] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    data();
  }, []);
  const data = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`${APIURL}/check_auth/`)
      .then((r) => {
        if (r) {
          setAuthed(true);
        } else {
          setAuthed(false);
        }
      })
      .catch((err) => {
        setAuthed(false);
      });
  };
  return is_authenticate ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
