import { useState, useContext } from "react";
import { AuthContext } from "../App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:8088";

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok && data.message === "Login successful!") {
        // Store user data in localStorage
        const userData = {
          id: data.user?.id || data.id,
          username: data.user?.username || data.username || username,
          email: data.user?.email || data.email,
        };

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

                                // Set authentication status
        setIsAuthenticated(true);

        alert(data.message || "Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        setIsAuthenticated(false);
        alert(data.message || "Login failed! Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="focus:border-blue-500 focus:ring-blue-500"
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:border-green-500 focus:ring-green-500"
          />
          <Button
            id="loginBtn"
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-green-600 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
