import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Yadamarket — Market streaming live. See it, buy it." />
        <meta name="theme-color" content="#8B1A1A" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Yadamarket" />
        <meta property="og:description" content="Market streaming live — see it, buy it." />
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  );
}
