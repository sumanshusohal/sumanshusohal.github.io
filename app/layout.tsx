import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://sumanshusohal.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sumanshu Sohal | Cybersecurity Engineer & AI Researcher",
  description:
    "Portfolio of Sumanshu Sohal, a cybersecurity engineer and PhD researcher focused on threat detection, SIEM engineering, incident response, and applied AI.",
  applicationName: "Sohal Cyber Defense",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sumanshu Sohal | Cybersecurity Engineer & AI Researcher",
    description:
      "Detection engineering, incident response, SOC research, and applied AI for measurable cyber defense.",
    url: siteUrl,
    siteName: "Sohal Cyber Defense",
    type: "website",
    images: [
      {
        url: "/og-signal-console.png",
        width: 1728,
        height: 910,
        alt: "Sumanshu Sohal cybersecurity evidence console",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumanshu Sohal | Cybersecurity Engineer & AI Researcher",
    description:
      "Detection engineering, incident response, SOC research, and applied AI for measurable cyber defense.",
    images: ["/og-signal-console.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#010305",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
