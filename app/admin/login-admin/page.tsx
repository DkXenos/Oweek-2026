import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCredentials,
} from "@/lib/admin-auth";
import "./styles.css";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

async function loginAction(formData: FormData) {
  "use server";

  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  // Kredensial bisa diubah lewat .env tanpa perlu mengubah code.
  const credentials = getAdminCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    redirect("/login-admin?error=1");
  }

  const cookieStore = await cookies();
  // Cookie hanya menyimpan token bertanda tangan, bukan password.
  cookieStore.set(ADMIN_COOKIE_NAME, createAdminSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin-oweek");
}

export default async function LoginAdminPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <main className="login-admin-page">
      <section className="login-admin-card" aria-labelledby="login-title">
        <p className="login-kicker">OWeek Universitas Ciputra</p>
        <h1 id="login-title">Admin Login</h1>

        {hasError ? (
          <p className="login-error">Username atau password salah.</p>
        ) : null}

        <form action={loginAction} className="login-form">
          <label>
            <span>Username</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit">Masuk</button>
        </form>
      </section>
    </main>
  );
}
