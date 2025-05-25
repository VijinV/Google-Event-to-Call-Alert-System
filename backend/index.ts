import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import "./config/passport";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/dbConfig";
import passport from "./config/passport";
import userRoutes from "./routes/userRoute";
import reminderRoutes from "./routes/reminderRoute";
import cookieParser from "cookie-parser";
import cron from "./services/cron";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/reminder", reminderRoutes);
cron();

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
