import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IM_Fell_French_Canon_SC } from "@next/font/google";
import { SWRConfig } from "swr";

const imFellFrenchCanonSC = IM_Fell_French_Canon_SC({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <style jsx global>{`
        html {
          font-family: ${imFellFrenchCanonSC.style.fontFamily};
          scroll-behavior: smooth;
        }
      `}</style>

      <Component {...pageProps} />
    </SWRConfig>
  );
}
