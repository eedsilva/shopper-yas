import jwt from "jsonwebtoken";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET ?? "shopperyas-admin-secret";

export interface AdminTokenPayload {
  role: "admin";
  iat?: number;
  exp?: number;
}

export function generateAdminToken(): string {
  const payload: AdminTokenPayload = { role: "admin" };
  return jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: "12h" });
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, ADMIN_JWT_SECRET) as AdminTokenPayload;
}
