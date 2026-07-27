import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "oweek_session";

const DEFAULT_ADMIN_USERNAME = "adminoweekuc26";
const DEFAULT_ADMIN_PASSWORD = "adminpassword123";

function getAdminSecret() {
  // Untuk production, isi ADMIN_SESSION_SECRET di environment.
  // Default ini hanya supaya local development langsung bisa dicoba.
  return process.env.ADMIN_SESSION_SECRET || "oweek-dev-session-secret";
}

export function getAdminCredentials() {
  // Untuk production, isi ADMIN_USERNAME dan ADMIN_PASSWORD di environment.
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  };
}

export function createAdminSessionToken(username: string) {
  // Token sederhana: payload base64url + HMAC signature.
  // Tidak memakai database, sehingga cocok untuk modul admin file-JSON.
  const payload = Buffer.from(
    JSON.stringify({
      username,
      createdAt: Date.now(),
    }),
    "utf8",
  ).toString("base64url");
  const signature = createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string) {
  // Validasi signature token supaya cookie tidak bisa asal dipalsukan.
  if (!token) return false;

  const [payload, signature] = token.split(".");

  if (!payload || !signature) return false;

  const expected = createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(signatureBuffer, expectedBuffer);
}
