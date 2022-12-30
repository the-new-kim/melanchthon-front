import { ISEO } from "@libs/types";
import Head from "next/head";

interface ISeoProps {
  seo: ISEO;
}

export default function Seo({ seo }: ISeoProps) {
  return (
    <Head>
      <title>{seo.metaTitle}</title>
      <meta
        name="description"
        content={seo.metaDescription}
        key="description"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta property="og:url" content={"url"} key="og:url" />
      <meta property="og:title" content={seo.metaTitle} key="og:title" />
      <meta
        property="og:description"
        content={seo.metaDescription}
        key="og:description"
      />
      {seo.metaImage.data && (
        <meta
          property="og:image"
          content={seo.metaImage.data.attributes.url}
          key="og:image"
        />
      )}
      <meta property="og:type" content="website" />
      <link rel="canonical" href={"url"} />
      {/* {seo.metaTags &&
        metaTags.map((meta) => (
          <meta name={delve(meta, 'name')} content={delve(meta, 'content')} />
        ))}
      {preventIndexing && (
        <>
          <meta name="robots" content="noindex"></meta>
          <meta name="googlebot" content="noindex"></meta>
        </>
      )} */}
      <script type="application/ld+json">{seo.structuredData}</script>
    </Head>
  );
}
