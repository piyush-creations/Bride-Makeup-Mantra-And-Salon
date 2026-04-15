import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.scss";

const AdminAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // 🔥 IMPORTANT: base URL (backend)
  const API = "http://localhost:5000";

  // Check login status on load
  useEffect(() => {
    axios
      .get(`${API}/api/admin/check`, { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          navigate("/admin/dashboard"); // redirect if already logged in
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/admin/login`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsLoggedIn(true);
        navigate("/admin/dashboard"); // 🔥 redirect after login
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/api/admin/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/admin/login"); // 🔥 redirect after logout
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-auth">
      {!isLoggedIn ? (
        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="logout-card">
          <h2>Welcome Admin 👋</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AdminAuth;