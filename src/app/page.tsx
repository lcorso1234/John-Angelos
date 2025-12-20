"use client";

const CONTACT = {
  firstName: "John",
  lastName: "Angelos",
  phone: "+1 (708) 269-8326",
  phoneDigits: "+17082698326",
  company: "Chromium Industries LLC",
  email: "jangelos@chromiumind.com",
  tagline: "You'll be surprised what rolls off of our rolls",
};

export default function Home() {
  const handleSaveContact = () => {
    const openSmsPrompt = () => {
      const confirmed = window.confirm(
        "Send John a text to confirm you're in his network?"
      );
      if (!confirmed) return;

      const smsBody = encodeURIComponent(
        "You're now connected with John Angelos from Chromium Industries."
      );
      const smsUri = `sms:${CONTACT.phoneDigits}?&body=${smsBody}`;
      window.location.href = smsUri;
    };

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
      `FN:${CONTACT.firstName} ${CONTACT.lastName}`,
      `ORG:${CONTACT.company}`,
      `EMAIL:${CONTACT.email}`,
      `TEL;TYPE=CELL:${CONTACT.phoneDigits}`,
      `NOTE:${CONTACT.tagline}`,
      "END:VCARD",
    ].join("\n");

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      const dataUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
      const link = document.createElement("a");
      link.href = dataUrl;
      link.target = "_blank";
      link.download = "John-Angelos.vcf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      const blob = new Blob([vcard], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "John-Angelos.vcf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    setTimeout(openSmsPrompt, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 text-gray-100">
      <main className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#3a3f43] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0,rgba(145,255,120,0.12),transparent_30%),#2f3438] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)]">
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#1f2326] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.45)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(145,255,120,0.06),transparent_25%),radial-gradient(circle_at_80%_60%,rgba(0,0,0,0.35),transparent_35%)]" />

        <section className="relative z-10 space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#a3f45f]">
              Business Card
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.65)]">
              Chromium Industries
            </h1>
            <p className="text-sm text-gray-300">
              {CONTACT.firstName} {CONTACT.lastName}
            </p>
          </header>

          <button
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#a3f45f] px-5 py-4 text-sm font-semibold uppercase tracking-wide text-[#0f1c12] shadow-[0_10px_40px_rgba(163,244,95,0.35),0_0_0_1px_rgba(44,68,40,0.4)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0.5"
            onClick={handleSaveContact}
          >
            <span className="absolute inset-0 animate-jiggle bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_32%)] opacity-70 mix-blend-soft-light" />
            <span className="relative">Save Contact &amp; Text John</span>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#5a7f3b] bg-[#b5ff73] text-[#0f1c12] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              →
            </span>
          </button>

          <div className="relative rounded-xl border border-[#3f4549] bg-[rgba(0,0,0,0.35)] p-4 text-sm text-gray-200 shadow-[0_12px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="text-[#a3f45f]">Note</div>
            <p className="mt-1 text-gray-200">{CONTACT.tagline}</p>
          </div>

          <footer className="space-y-1 text-center text-xs text-gray-300">
            <div className="font-semibold tracking-wide">Built in America, on earth.</div>
            <div className="italic text-gray-400">
              Making relationships built to last, the American Way.
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
