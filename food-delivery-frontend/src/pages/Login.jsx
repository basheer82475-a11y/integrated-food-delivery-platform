import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, loading } = useAuth();

  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      await register(signupName, signupEmail, signupPassword);
      toast.success("Account created successfully!");
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirmPassword("");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!loginEmail.trim() || !loginPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(loginEmail, loginPassword);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>

        {isSignUp ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className="w-full border border-gray-400 p-3 rounded mb-4 text-black"
              disabled={isLoading}
            />

            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full border border-gray-400 p-3 rounded mb-4 text-black"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full border border-gray-400 p-3 rounded mb-4 text-black"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              className="w-full border border-gray-400 p-3 rounded mb-4 text-black"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "SIGN UP"}
            </button>

            <p className="text-center mt-4 text-black">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border border-gray-400 p-3 rounded mb-4 text-black"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full border border-gray-400 p-3 rounded mb-4 text-black"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "SIGN IN"}
            </button>

            <p className="text-center mt-4 text-black">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};



export default Login;