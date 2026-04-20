import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDb } from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import mainRoutes from "./routes/mainRoutes.js";
import { ensureDefaultAdmin } from "./utils/bootstrap.js";

dotenv.config({ override: true });

const app = express();
const port = Number(process.env.PORT || 4100);
const host = process.env.HOST || "0.0.0.0";
const mongoUri =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/navoiy_kiyim_dokon_clean";
const corsOrigins = String(process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const corsOptions = corsOrigins.length
  ? {
      origin: corsOrigins,
    }
  : undefined;

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "backendsklad",
    message: "Backend is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "backendsklad",
  });
});

app.use("/api", mainRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await connectDb(mongoUri);
  await ensureDefaultAdmin();

  app.listen(port, host, () => {
    console.log(`Backendsklad API is running on http://${host}:${port}`);
  });
}

start().catch((error) => {
  console.error("Backendsklad startup failed:", error);
  process.exit(1);
});
