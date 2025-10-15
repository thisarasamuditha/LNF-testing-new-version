// SignUp page for user registration
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function SignUp() {
  // State for form fields and loading
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:8080";

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      alert(data.message || "Registration successful!");
    } catch (error) {
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Centered container with gradient background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      {/* Card container for the form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-blue-100">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Sign Up
        </h2>
        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username input */}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="focus:border-blue-500 focus:ring-blue-500"
          />
          {/* Email input */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:border-blue-500 focus:ring-blue-500"
          />
          {/* Password input */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:border-green-500 focus:ring-green-500"
          />
          {/* Confirm Password input */}
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="focus:border-green-500 focus:ring-green-500"
          />
          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        {/* Link to Sign In page */}
        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 hover:text-green-600 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
