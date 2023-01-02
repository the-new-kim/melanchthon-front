import Blocks from "@components/blocks";
import Layout from "@components/layout";
import {
  getMatchedPostType,
  getPageData,
  getPagePaths,
  getPostData,
  getPostPaths,
} from "@libs/strapi";
import { IGlobal, IPage } from "@libs/types";

import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface IPageProps {
  pageData: IPage;
  globalData: IGlobal;
}

export default function Page({ pageData, globalData }: IPageProps) {
  const router = useRouter();

  return (
    <Layout
      mainMenu={pageData.attributes.global_category.data?.attributes.mainMenu}
      globalMenu={globalData.attributes.globalMenu}
      currentPageCategory={
        pageData.attributes.global_category.data?.attributes.title
      }
    >
      {pageData.attributes.blocks && (
        <Blocks blocks={pageData.attributes.blocks} />
      )}
      <ul className="fixed left-0 top-0 bg-red-400 z-50">
        {pageData.attributes.localizations.data.map((data) => (
          <li key={data.id}>
            <Link href={data.attributes.url} locale={data.attributes.locale}>
              {data.attributes.locale}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  const pagePaths = await getPagePaths();
  const newsPaths = await getPostPaths("news-articles");

  const paths = [...pagePaths, ...newsPaths];
  // const paths = pagePaths;

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params || !locale) {
    return { props: {} };
  }

  const apiName = await getMatchedPostType(locale, params.slug);

  if (apiName !== "pages") {
    const { pageData, globalData } = await getPostData(
      locale,
      apiName,
      params.slug
    );
    return { props: { pageData, globalData } };
  }

  const { pageData, globalData } = await getPageData(locale, params.slug);
  return { props: { pageData, globalData } };
};
