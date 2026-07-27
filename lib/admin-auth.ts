import { createHmac, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";

export const ADMIN_COOKIE_NAME = "oweek_session";

function getAdminSecret() {
  // Secret penanda-tangan session. WAJIB diisi lewat .env (lihat .env.example).
  // Tidak ada default di repo supaya secret tidak pernah ikut ke source code.
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET belum diset. Tambahkan di file .env (lihat .env.example).",
    );
  }

  return secret;
}

// Verifikasi login admin. Password TIDAK pernah disimpan di repo:
// - username dibandingkan dengan ADMIN_USERNAME
// - password dicek dengan bcrypt terhadap ADMIN_PASSWORD_HASH
// Keduanya berasal dari .env (file gitignored), bukan dari source code.
export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !passwordHash) {
    throw new Error(
      "ADMIN_USERNAME / ADMIN_PASSWORD_HASH belum diset. Tambahkan di file .env (lihat .env.example).",
    );
  }

  const usernameOk = username === expectedUsername;
  // bcrypt.compare tetap dijalankan walau username salah, supaya waktu respons
  // tidak membocorkan apakah username-nya sudah benar.
  const passwordOk = await bcrypt.compare(password, passwordHash);

  return usernameOk && passwordOk;
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
