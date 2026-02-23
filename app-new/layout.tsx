import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Microtex International",
  description: "Highest quality for the best price — Superior turnkey-solutions through custom design, manufacturing, installation and support of packaging machinery.",
  icons: {
    icon: "https://microtex.co/wp-content/uploads/2023/01/Mctex-logo-New-e1674388359710.png",
    apple: "https://microtex.co/wp-content/uploads/2023/01/Mctex-logo-New-e1674388359710.png",
  },
  openGraph: {
    images: [
      {
        url: "https://microtex.co/wp-content/uploads/2023/01/Mctex-logo-New-e1674388359710.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="/655c6cfb4f7d36ff71747561/css/matenco.webflow.shared.cf7d2e073.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root {
  --marine-blue--100: #be2428;
  --marine-blue--75: #2B161B;
  --marine-blue--50: #944a4c;
  --marine-blue--25: #c4a0a1;
  --ocean-blue--100: #8b1a1d;
  --ocean-blue--75: #a04547;
  --ocean-blue--50: #b67071;
  --ocean-blue--25: #ccabac;
  --light-blue--100: #d4696b;
  --light-blue--75: #de9091;
  --light-blue--50: #e8b0b1;
  --light-blue--25: #f2d0d0;
}`,
          }}
        />
      </head>
      <body>
        <div className="page-wrapper">{children}</div>

        <Script
          src="/js/jquery-3.5.1.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/655c6cfb4f7d36ff71747561/js/webflow.schunk.36b8fb49256177c8.js"
          strategy="afterInteractive"
        />
        <Script
          src="/655c6cfb4f7d36ff71747561/js/webflow.schunk.520bf149f5c331d5.js"
          strategy="afterInteractive"
        />
        <Script
          src="/655c6cfb4f7d36ff71747561/js/webflow.7f94a5ed.58433c9dc90b00c8.js"
          strategy="afterInteractive"
        />
        <Script
          src="/@studio-freight/lenis@1.0.34/dist/lenis.min.js"
          strategy="afterInteractive"
        />
        <Script
          id="wf-mod"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
        <Script
          id="lenis-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    infinite: false,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}`,
          }}
        />
      </body>
    </html>
  );
}
