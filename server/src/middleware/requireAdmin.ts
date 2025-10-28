import type { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../lib/adminAuth";

const BEARER_PREFIX = "bearer ";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  const normalized = header.trim();
  if (!normalized.toLowerCase().startsWith(BEARER_PREFIX)) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  const token = normalized.slice(BEARER_PREFIX.length).trim();
  if (!token) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }

  try {
    verifyAdminToken(token);
    next();
  } catch (error) {
    console.warn("Admin token verification failed", error);
    return res.status(401).json({ message: "Invalid admin token" });
  }
};

export default requireAdmin;
