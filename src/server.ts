import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import v1_rootRouter from "./routes/v1";
import moment from "moment-timezone";

dotenv.config();

const app = express();

// BODY PARSER INTIALIZATION
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// CORS INTIALIZATION

app.use(cors());

// HELMET INTIALIZATION

app.use(helmet());

// MORGAN INTIALIZATION
morgan.token("local-date", () => {
  return moment().tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss");
});

morgan.format(
  "morgan",
  "[:local-date] :method :url :status :response-time ms - :res[content-length]"
);

app.use(morgan("morgan"));

//INITIALIZE ROUTES

app.use("/api", v1_rootRouter);

// 404 MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({ CLOUDFLARE: "👋🌎🚀" });
});

//INITIALIZE PORT

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(
    "\n",
    "*************************************************",
    "\n",
    `Server running on port ${PORT}`,
    "\n",
    "**************************************************"
  );
});
