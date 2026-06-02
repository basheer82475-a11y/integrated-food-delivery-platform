import { useNavigate } from "react-router-dom";
import bg from "../assets/luxora.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      ></div>

      <div style={{ zIndex: 2 }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Welcome to Food Delivery 🍽️
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Discover the best restaurants near you
        </p>

        <button
          onClick={() => navigate("/restaurants")}
          style={{
            padding: "12px 25px",
            fontSize: "1rem",
            backgroundColor: "#ffb300",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Home;