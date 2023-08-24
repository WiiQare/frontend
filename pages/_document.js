import { Html, Head, Main, NextScript } from 'next/document';
import Drawer from '../components/molecules/Navbar/Drawer';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/favicon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
