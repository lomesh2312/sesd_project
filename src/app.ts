import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { ApiError } from "./utils/ApiError";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, "Endpoint not found"));
});

app.use(errorMiddleware);

export default app;
