import Blocks from "@components/blocks";
import Layout from "@components/layout";
import { getLocales, getPageData, getPagePaths, getPages } from "@libs/strapi";
import { IGlobal, IPage } from "@libs/types";
import { Inter } from "@next/font/google";
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });

interface IHomeProps {
  pageData: IPage;
  globalData: IGlobal;
}

export default function Home({ pageData, globalData }: IHomeProps) {
  return (
    <Layout
      mainMenu={pageData.attributes.global_category.data.attributes.mainMenu}
      globalMenu={globalData.attributes.globalMenu}
      currentPageCategory={
        pageData.attributes.global_category.data.attributes.title
      }
    >
      <h1>{pageData.attributes.title}</h1>
      {pageData.attributes.blocks && (
        <Blocks blocks={pageData.attributes.blocks} />
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPagePaths();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return { props: {} };
  }

  const { pageData, globalData } = await getPageData(params.slug);

  return { props: { pageData, globalData } };
};
