import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl">Page not found</h1>
      <p className="mt-4 max-w-lg text-text/70">
        The page you were looking for does not exist or has moved.
      </p>
      <Link className="btn-primary mt-8" href="/">
        Return home
      </Link>
    </section>
  );
}
