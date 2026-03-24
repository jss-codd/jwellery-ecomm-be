import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import pino, { type LoggerOptions } from "pino";
import pinoHttp from "pino-http";
import { createStream } from "rotating-file-stream";

import { env } from "./env";

const logDirectory = path.resolve(process.cwd(), env.LOG_DIR);

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory, { recursive: true });
}

const rotatingStream = createStream("app.log", {
  path: logDirectory,
  interval: "1d",
  maxFiles: 7,
  compress: "gzip",
});

const loggerOptions: LoggerOptions = {
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: { service: "jewellery-backend" },
};

const stdoutTransport =
  env.NODE_ENV === "development"
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      })
    : undefined;

export const logger = stdoutTransport
  ? pino(loggerOptions, pino.multistream([{ stream: stdoutTransport }, { stream: rotatingStream }]))
  : pino(loggerOptions, rotatingStream);

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => {
    const request = req as typeof req & { requestId?: string };
    const headerValue = req.headers["x-request-id"];
    const headerId = Array.isArray(headerValue) ? headerValue[0] : headerValue;
    const requestId = headerId || randomUUID();
    request.requestId = requestId;
    return requestId;
  },
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) {
      return "error";
    }
    if (res.statusCode >= 400) {
      return "warn";
    }
    return "info";
  },
  customSuccessMessage: (req, res) =>
    `${req.method} ${req.url} completed with status ${res.statusCode}`,
  customErrorMessage: (req, res, err) =>
    `${req.method} ${req.url} failed with status ${res.statusCode}: ${err.message}`,
});
