import { PageHeader } from "@/components/page-header";
import { ShirtForm } from "./ShirtForm";

export const metadata = {
  title: "Shirt-Nachbestellung",
  description: "Trag deine Shirtgrösse für die nächste VCTL-Bestellung ein.",
  robots: { index: false, follow: false },
};

export default function ShirtPage() {
  return (
    <>
      <PageHeader
        kicker="Mitglieder"
        title="Shirt-Nachbestellung"
        subtitle="Trag deine Grösse ein, damit wir bei der nächsten Sammelbestellung dein Shirt mit dazu nehmen."
      />

      <section className="relative z-10 mx-auto max-w-2xl px-6 lg:px-10 -mt-20 pb-24">
        <ShirtForm />
      </section>
    </>
  );
}
