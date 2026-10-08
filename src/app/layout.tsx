import type { Metadata } from "next";
import "./globals.css";
import "./interactions.css";
import "./portfolio-experiences.css";
const title = "Anurag Kumar Srivastava | Python & GenAI Developer";
const description =
  "Portfolio of Anurag Kumar Srivastava — Python & GenAI Developer focused on AI agents, RAG, backend development and data engineering.";
export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Anurag Kumar Srivastava" }],
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: "Anurag / Dev",
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? { url: process.env.NEXT_PUBLIC_SITE_URL }
      : {}),
  },
  twitter: { card: "summary", title, description },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <noscript><style>{`.reveal,.stagger-item{opacity:1!important;transform:none!important}`}</style></noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
