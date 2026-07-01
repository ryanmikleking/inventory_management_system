import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes.js";
// import helmet from "helmet";
// import morgan from "morgan";

const app = express();

// Security + middleware
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging (dev only usually)
// app.use(morgan("dev"));

// app.use("/api/images", imageRoutes);
// app.use("/api/files", uploadRoutes);

// Routes
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Inventory API running" });
});

export default app;
