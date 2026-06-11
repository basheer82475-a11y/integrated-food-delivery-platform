import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import bg from "../assets/luxora.png";

function Login() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  // Sign-in state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign-up state
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", { email, password });
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      // Backend sets cookies on success; switch to sign-in UI.
      setIsSignUp(false);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Sign In */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col text-black justify-center px-12 transition-all duration-700 ${
            isSignUp ? "left-0 opacity-0" : "left-0 opacity-100"
          }`}
        >
          <h1 className="text-5xl font-bold text-black mb-8">Sign In</h1>

          {error ? (
            <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-3 rounded mb-4 w-full"
              autoComplete="email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-3 rounded mb-4 w-full"
              autoComplete="current-password"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-full font-bold w-full"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>

        {/* Sign Up */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col justify-center px-12 text-black transition-all duration-700 ${
            isSignUp ? "right-0 opacity-100" : "right-0 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold text-black mb-8">
            Create Account
          </h1>

          {error ? (
            <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border p-3 rounded mb-4 w-full"
              autoComplete="name"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-3 rounded mb-4 w-full"
              autoComplete="email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-3 rounded mb-4 w-full"
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-full font-bold w-full"
            >
              {loading ? "Creating..." : "SIGN UP"}
            </button>
          </form>
        </div>

        {/* Background Image Panel */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ${
            isSignUp ? "left-0" : "left-1/2"
          }`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-black/50 flex flex-col justify-center items-center text-center px-10">
            {isSignUp ? (
              <>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Welcome Back!
                </h1>

                <p className="text-white mb-8">
                  Sign in to continue your luxury dining experience.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="border-2 border-white text-white px-8 py-3 rounded-full"
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Hello, Friend!
                </h1>

                <p className="text-white mb-8">
                  Create your Luxora account and start ordering.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="border-2 border-white text-white px-8 py-3 rounded-full"
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

