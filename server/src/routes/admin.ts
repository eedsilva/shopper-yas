import { Router } from "express";
import { generateAdminToken } from "../lib/adminAuth";

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE ?? "admin";

const router = Router();

router.post("/login", (req, res) => {
  const { code } = req.body as { code?: unknown };

  if (typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Missing access code" });
  }

  const normalized = code.trim();
  if (normalized === ADMIN_ACCESS_CODE) {
    const token = generateAdminToken();
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid access code" });
});

export default router;
