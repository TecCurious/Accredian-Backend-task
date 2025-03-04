import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import cors from "cors";
import ApiResponse from "./utils/apiResponse";
import { errorHandler } from "./utils/errorHandler";
import { notFoundHandler } from "./utils/notFoundHadnler";
import referralRoute from "./routes/referral.route";
import path = require("path");

dotenv.config();
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req: Request, res: Response) => {
  res.send(new ApiResponse(200, " Accredian-Backend-task", null));
});

app.use("/api/referrals", referralRoute);

app.use(notFoundHandler);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
