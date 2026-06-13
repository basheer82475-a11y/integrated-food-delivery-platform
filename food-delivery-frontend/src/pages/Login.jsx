import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
const navigate = useNavigate();

const [isSignUp, setIsSignUp] = useState(false);

const [signupName, setSignupName] = useState("");
const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const handleSignUp = () => {
if (!signupName || !signupEmail || !signupPassword) {
alert("Please fill all fields");
return;
}

```
const user = {
  name: signupName,
  email: signupEmail,
  password: signupPassword,
};

localStorage.setItem("user", JSON.stringify(user));

alert("Account Created Successfully!");

setSignupName("");
setSignupEmail("");
setSignupPassword("");

setIsSignUp(false);
```

};

const handleSignIn = () => {
const user = JSON.parse(localStorage.getItem("user"));

```
if (!user) {
  alert("Please create an account first");
  return;
}

if (
  loginEmail === user.email &&
  loginPassword === user.password
) {
  localStorage.setItem("isLoggedIn", "true");
  navigate("/");
} else {
  alert("Invalid Email or Password");
}
```

};

return ( <div className="min-h-screen bg-black flex items-center justify-center px-4"> <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

```
    <h1 className="text-3xl font-bold text-center mb-6 text-black">
      {isSignUp ? "Create Account" : "Sign In"}
    </h1>

    {isSignUp ? (
      <>
        <input
          type="text"
          placeholder="Name"
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
          style={{ color: "black" }}
          className="w-full border border-gray-400 p-3 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          style={{ color: "black" }}
          className="w-full border border-gray-400 p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          style={{ color: "black" }}
          className="w-full border border-gray-400 p-3 rounded mb-4"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-orange-500 text-white py-3 rounded-lg"
        >
          SIGN UP
        </button>

        <p className="text-center mt-4 text-black">
          Already have an account?{" "}
          <button
            onClick={() => setIsSignUp(false)}
            className="text-orange-500 font-semibold"
          >
            Sign In
          </button>
        </p>
      </>
    ) : (
      <>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          style={{ color: "black" }}
          className="w-full border border-gray-400 p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          style={{ color: "black" }}
          className="w-full border border-gray-400 p-3 rounded mb-4"
        />

        <button
          onClick={handleSignIn}
          className="w-full bg-orange-500 text-white py-3 rounded-lg"
        >
          SIGN IN
        </button>

        <p className="text-center mt-4 text-black">
          Don't have an account?{" "}
          <button
            onClick={() => setIsSignUp(true)}
            className="text-orange-500 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </>
    )}
  </div>
</div>
```

);
};

export default Login;
