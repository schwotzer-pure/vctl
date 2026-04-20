"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/training", label: "Training" },
  { href: "/swiss-cup", label: "Swiss-Cup" },
  { href: "/probetraining", label: "Probetraining" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-slate-200"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"
        aria-label="Hauptnavigation"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <Logo light={light} />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "transition-colors",
                    light
                      ? "text-white/90 hover:text-white"
                      : "text-slate-600 hover:text-brand-600",
                    active && !light ? "text-brand-600" : "",
                    active && light ? "text-white" : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/probetraining"
            className={[
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition",
              light
                ? "bg-white text-brand-600 hover:bg-brand-50"
                : "bg-brand-600 text-white hover:bg-brand-700",
            ].join(" ")}
          >
            Probetraining
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={[
            "md:hidden inline-flex items-center justify-center rounded-lg p-2",
            light ? "text-white" : "text-slate-700",
          ].join(" ")}
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-slate-200">
          <ul className="flex flex-col px-8 py-6 space-y-1 text-base font-semibold uppercase tracking-wide">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-slate-700 hover:text-brand-600"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/probetraining"
                className="block w-full rounded-full bg-brand-600 px-5 py-4 text-center text-white"
                onClick={() => setOpen(false)}
              >
                Probetraining
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Logo({ light }: { light: boolean }) {
  return (
    <span
      className={[
        "flex items-center gap-3 text-xl font-black tracking-tight",
        light ? "text-white" : "text-ink",
      ].join(" ")}
    >
      <span
        className={[
          "relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white",
          light
            ? "ring-1 ring-white/40 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.35)]"
            : "ring-1 ring-slate-200 shadow-sm",
        ].join(" ")}
      >
        <Image
          src="/logo.png"
          alt="VCTL Logo"
          width={40}
          height={40}
          className="h-9 w-9 object-contain"
          priority
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight">
          VCTL
          <span className={light ? "text-white/60" : "text-brand-600"}>.</span>
        </span>
        <span
          className={[
            "mt-1 text-[9px] font-bold uppercase tracking-[0.35em]",
            light ? "text-white/70" : "text-muted",
          ].join(" ")}
        >
          Velotrial · Luzern
        </span>
      </span>
    </span>
  );
}
