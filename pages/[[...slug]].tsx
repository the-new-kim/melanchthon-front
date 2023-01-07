import Blocks from "@components/blocks";
import Layout from "@components/layout";
import {
  getGlobalData,
  getApiName,
  getPageData,
  getPagePaths,
  getPostData,
  getPostPaths,
} from "@libs/strapi";
import { IBlock, IGlobal, IPage, TApiNameTypes } from "@libs/types";

import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

interface IPageProps {
  pageData: IPage;
  globalData: IGlobal;
  apiName: TApiNameTypes;
}

export default function Page({ pageData, globalData, apiName }: IPageProps) {
  const [blocks, setBlocks] = useState<IBlock[]>([]);

  useEffect(() => {
    setBlocks(
      pageData.attributes.blocks.map((block) =>
        block.__component === "blocks.post-list"
          ? {
              ...block,
              global_category: pageData.attributes.global_category,
              pageUrl: pageData.attributes.url,
            }
          : block
      )
    );
  }, [pageData]);

  return (
    <Layout
      pageData={pageData}
      globalMenu={globalData.attributes.globalMenu}
      currentPageCategory={
        pageData.attributes.global_category.data?.attributes.title
      }
    >
      {blocks && <Blocks blocks={blocks} />}
    </Layout>
  );
}

export async function getStaticPaths() {
  const pagePaths = await getPagePaths();
  const newsPaths = await getPostPaths("news-articles");
  const eventsPaths = await getPostPaths("events");
  const exhibitionPaths = await getPostPaths("exhibitions");

  const paths = [
    ...pagePaths,
    ...newsPaths,
    ...eventsPaths,
    ...exhibitionPaths,
  ];

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params || !locale) {
    return { props: {} };
  }

  const apiName = await getApiName(locale, params.slug);
  const globalData = await getGlobalData(locale);

  if (apiName !== "pages" && params.slug?.length) {
    const pageData = await getPostData(
      locale,
      apiName,
      params.slug[params.slug.length - 1]
    );

    return { props: { pageData, globalData, apiName } };
  }

  const pageData = await getPageData(locale, params.slug);

  return { props: { pageData, globalData, apiName } };
};
