import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Login",
};

type SearchParams = Promise<{ redirect?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const isDevDummy = process.env.NEXT_PUBLIC_DEV_DUMMY_AUTH === "true";

  if (isDevDummy) {
    redirect(params.redirect ?? "/admin");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect(params.redirect ?? "/admin");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-600">
          VCTL Login
        </span>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-ink">
          Anmelden
        </h1>
        <p className="mt-2 text-sm text-muted">
          Wir schicken dir einen Magic Link an deine E-Mail-Adresse.
        </p>
        <div className="mt-6">
          <LoginForm redirectTo={params.redirect ?? "/admin"} />
        </div>
        {params.error ? (
          <p className="mt-4 text-sm text-red-600">
            Login fehlgeschlagen. Bitte versuche es erneut.
          </p>
        ) : null}
      </div>
    </div>
  );
}
