"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="error-page container">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>Let&apos;s try that again.</h1>
      <p>The portfolio couldn&apos;t load correctly.</p>
      <button className="button button-primary" onClick={reset}>
        Try again
      </button>
      <a className="button button-secondary" href="/">
        Back to portfolio
      </a>
    </main>
  );
}
