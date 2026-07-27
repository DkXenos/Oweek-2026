// Generate a bcrypt hash for the admin password.
//
// Usage:
//   node scripts/hash-admin-password.mjs 'your-new-password'
//
// The plaintext password is never written to disk or the repo.
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-admin-password.mjs 'your-new-password'");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
// bcrypt hashes contain "$", which Next.js env loading tries to expand as
// variables and mangles. Escaping each "$" as "\$" keeps it literal in .env.
const escaped = hash.replace(/\$/g, "\\$");

console.log("\nFor your local .env file (paste this line exactly):");
console.log(`ADMIN_PASSWORD_HASH=${escaped}`);

console.log("\nFor the Vercel dashboard (paste the RAW value, no escaping, no quotes):");
console.log(hash);
console.log("");
