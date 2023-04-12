import { Html, Head, Main, NextScript } from "next/document";
import Drawer from "../components/molecules/Navbar/Drawer";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
