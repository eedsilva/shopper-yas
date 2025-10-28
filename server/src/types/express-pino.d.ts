import "express-serve-static-core";
import "http";
import type { Logger } from "../lib/logger";

declare module "http" {
  interface IncomingMessage {
    log: Logger;
    id?: string;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    log: Logger;
    id?: string;
  }
}
