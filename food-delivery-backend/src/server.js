import app from "./app.js";
import { env } from "./config/env.js";
import connectDatabase from "./config/database.js";

const PORT = env.port;

let server;

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);

    process.exit(1);
  }
};

startServer();

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");

  server.close(() => {
    console.log("Server stopped");

    process.exit(0);
  });
});
