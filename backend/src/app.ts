// Graceful process-level error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chatRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", chatRoutes);

// Production global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = (process.env.PORT || 3001) as number;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
