import type { ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";

type ExpressError = Error & {
  status?: number;
  statusCode?: number;
  expose?: boolean;
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const error = err as ExpressError;
  const status = error.status ?? error.statusCode ?? 500;
  const isServerError = status >= 500;
  const responseMessage = isServerError ? "Internal Server Error" : error.message || "Request failed";
  const requestId = req.id;

  const log = req.log ?? logger;
  log.error({ err, requestId, status }, "Unhandled error");

  res.status(status).json({
    success: false,
    message: responseMessage,
    requestId,
  });
};
