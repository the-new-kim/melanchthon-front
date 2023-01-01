import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IM_Fell_French_Canon_SC } from "@next/font/google";

const imFellFrenchCanonSC = IM_Fell_French_Canon_SC({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${imFellFrenchCanonSC.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
