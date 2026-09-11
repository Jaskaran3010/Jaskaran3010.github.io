import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav minimal />
      <main id="main" className="mx-auto flex max-w-4xl flex-col items-start px-5 py-32 sm:px-8">
        <p className="meta-label mb-5">404</p>
        <h1 className="text-3xl font-medium tracking-tight">Page not found</h1>
        <Link href="/" className="quiet-link mt-8 font-mono text-[13.5px] text-ink-2">
          ← Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
