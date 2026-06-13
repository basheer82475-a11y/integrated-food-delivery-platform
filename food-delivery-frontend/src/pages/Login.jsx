import { useState } from "react";
import bg from "../assets/luxora.png";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* Sign In */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col justify-center px-12 transition-all duration-700 ${
            isSignUp ? "left-0 opacity-0" : "left-0 opacity-100"
          }`}
        >
          <h1 className="text-5xl font-bold text-black mb-8">
            Sign In
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded mb-4"
          />

          <button className="bg-orange-500 text-white py-3 rounded-full font-bold">
            SIGN IN
          </button>
        </div>

        {/* Sign Up */}
        <div
          className={`absolute top-0 h-full w-1/2 flex flex-col justify-center px-12 transition-all duration-700 ${
            isSignUp ? "right-0 opacity-100" : "right-0 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold text-black mb-8">
            Create Account
          </h1>

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded mb-4"
          />

          <button className="bg-orange-500 text-white py-3 rounded-full font-bold">
            SIGN UP
          </button>
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
};

export default Login;

