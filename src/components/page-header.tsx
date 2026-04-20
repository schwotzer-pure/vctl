import Image from "next/image";

type PageHeaderProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  /** Hintergrundbild im Duotone-Look (Orange × Tiefschwarz). */
  image?: {
    src: string;
    alt?: string;
  };
  /** Hintergrundvideo im Duotone-Look — überschreibt image wenn gesetzt. */
  video?: {
    src: string;
    /** CSS object-position, z.B. "center 30%" um nach unten zu verschieben. Standard: "center" */
    objectPosition?: string;
  };
};

export function PageHeader({ kicker, title, subtitle, image, video }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden text-white bg-[#0a0806]">
      {video ? (
        // Duotone-Stack mit Video (identisch zum Home-Hero)
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate"
          style={{ backgroundColor: "#0a0806" }}
        >
          <video
            src={video.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: video.objectPosition ?? "center",
              filter: "grayscale(100%) contrast(1.2)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#fb923c",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      ) : image ? (
        // Duotone-Stack mit Bild
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate"
          style={{ backgroundColor: "#0a0806" }}
        >
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover object-center"
            style={{
              filter: "grayscale(100%) contrast(1.2)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#fb923c",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      ) : (
        // Fallback: nur Orange-Gradient
        <div aria-hidden className="absolute inset-0 bg-hero-gradient" />
      )}

      {/* Vignette-Scrim links für Textlesbarkeit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,8,6,0.7) 0%, rgba(10,8,6,0.3) 45%, rgba(10,8,6,0) 75%)",
        }}
      />

      {/* Orange-Glow unten rechts */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(40% 50% at 95% 95%, rgba(249,115,22,0.35), transparent 70%)",
        }}
      />

      {/* Weicher Übergang zu Weiß unten */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-20"
        style={{
          background: "linear-gradient(to bottom, transparent, #ffffff 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-40 lg:px-10 lg:pt-44 lg:pb-52">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ring-white/30 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {kicker}
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
