import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

const description = `${profile.role} (${profile.stackLine}). ${profile.intro}`;

export const metadata: Metadata = {
  // Absolute URLs (Open Graph, canonical, Twitter card) are built from this.
  // Set NEXT_PUBLIC_SITE_URL in the deployment environment; localhost is only
  // the local-development fallback.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Boris Mujkovic",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "Serbia",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pančevo",
    addressCountry: "RS",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Belgrade Institute of Technology (BIT)",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetbrains.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint. Without JS the `.js` class never lands and
            every scroll-reveal section renders fully visible instead. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
