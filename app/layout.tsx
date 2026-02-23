import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { ContactPanelProvider } from "@/components/ContactPanelContext";
import ContactPanel from "@/components/ContactPanel";

export const metadata: Metadata = {
  title: "Microtex International | Packaging Machinery & Solutions",
  description:
    "Superior turnkey solutions through custom design, manufacturing, installation and support of packaging machinery and plant-related systems.",
  openGraph: {
    title: "Microtex International | Packaging Machinery & Solutions",
    description:
      "Superior turnkey solutions through custom design, manufacturing, installation and support of packaging machinery and plant-related systems.",
    url: "https://microtex.co/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContactPanelProvider>
          <LenisProvider>
            {children}
            <ContactPanel />
          </LenisProvider>
        </ContactPanelProvider>
      </body>
    </html>
  );
}
