const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use((req, res, next) => {
    next(new ApiError(404, "Endpoint not found"));
});

app.use(errorMiddleware);

module.exports = app;
