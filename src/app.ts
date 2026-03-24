import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { env } from "./config/env";
import { httpLogger } from "./config/logger";
import { passport } from "./config/passport";
import { swaggerSpec } from "./config/swagger";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import { apiRouter } from "./routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.ADMIN_APP_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(httpLogger);
app.use(passport.initialize());
app.use((req, res, next) => {
  if (req.requestId) {
    res.setHeader("x-request-id", req.requestId);
  }
  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(env.API_PREFIX, apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
