export default function NotFound() {
  return (
    <main className="error-page container">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>A small detour.</h1>
      <p>
        This page could not be found. Head back to the portfolio to explore my
        work.
      </p>
      <a href="/" className="button button-primary">
        Back to portfolio
      </a>
    </main>
  );
}
