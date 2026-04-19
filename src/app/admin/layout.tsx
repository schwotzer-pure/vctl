import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata = {
  title: "Admin",
};

const NAV = [
  { href: "/admin", label: "Übersicht" },
  { href: "/admin/mitglieder", label: "Mitglieder" },
  { href: "/admin/termine", label: "Termine" },
  { href: "/admin/beitraege", label: "Beiträge" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/probetrainings", label: "Probetrainings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (user.rolle !== "admin" && user.rolle !== "trainer") {
    redirect("/");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10 lg:px-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-6 space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
                Admin
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                {user.display_name ?? user.email}
              </p>
              <p className="text-xs text-muted capitalize">{user.rolle}</p>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-white hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <section className="flex-1 min-w-0">{children}</section>
      </div>
    </div>
  );
}
