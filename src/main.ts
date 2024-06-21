import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "reflect-metadata";
import { config } from "./config";
import routes from "./routes";

const PORT = config.port;
const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", routes());

app.listen(PORT, () => console.log(`application running on port ${PORT}`));
