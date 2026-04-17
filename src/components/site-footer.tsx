import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
              <Image
                src="/logo.png"
                alt="VCTL Logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight text-ink">
                VCTL<span className="text-brand-600">.</span>
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.35em] text-muted">
                Velotrial · Luzern
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Velo- & Trial Club Luzern. Wir trainieren Velotrial für alle Alters-
            und Leistungsstufen – jeden Mittwoch am Trialplatz Luzern.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            Verein
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/training" className="hover:text-brand-600">
                Training
              </Link>
            </li>
            <li>
              <Link href="/swiss-cup" className="hover:text-brand-600">
                Swiss-Cup
              </Link>
            </li>
            <li>
              <Link href="/probetraining" className="hover:text-brand-600">
                Probetraining
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            Training
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Mittwochs · Trialplatz Luzern</li>
            <li>Junioren · Jugend · Erwachsene</li>
            <li>Trainer: Debi & René</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Velo- & Trial Club Luzern</p>
          <p className="mt-2 sm:mt-0">
            Gemeinsam machen wir den VCTL stärker.
          </p>
        </div>
      </div>
    </footer>
  );
}
