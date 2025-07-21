import express from "express";
import helmet from "helmet";
import cors from "cors";
import userDetailsRoute from "./userDetails.js";

const app = express();
const PORT = 8000;

// Add security helmet, and cros origin(CORS) middleware. 
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic route to check if the server is running.
app.get("/", (req, res) => {
  res.redirect("/api/github/search"); // Adjust to match your frontend port
});

// gitHub api hook.
app.use("/api/github", userDetailsRoute);

// Starts the server.
app.listen(PORT, () => {
  console.log(`Backend live on http://localhost:${PORT}`);
});