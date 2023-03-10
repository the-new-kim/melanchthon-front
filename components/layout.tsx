import { IGlobalMenu, ILink, IMainMenu, IPage } from "@libs/types";
import { ReactNode, useEffect, useState } from "react";
import GlobalMenu from "./globalMenu";
import { MainMenu } from "./mainMenu";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import FooterMenu from "./footerMenu";
import ScrollToTopButton from "./scrollToTopButton";

interface ILayoutProps {
  children: ReactNode;
  globalMenu: IGlobalMenu;
  currentPageCategory: string;
  pageData: IPage;
}
export default function Layout({
  children,
  globalMenu,
  currentPageCategory,
  pageData,
}: ILayoutProps) {
  const { asPath, locale } = useRouter();
  const [mainMenu, setMainMenu] = useState<IMainMenu>();
  const [footerMenu, setFooterMenu] = useState<ILink[]>();

  useEffect(() => {
    setMainMenu(pageData.attributes.global_category.data?.attributes.mainMenu);
    setFooterMenu(
      pageData.attributes.global_category.data?.attributes.footerMenu?.links
    );
  }, [pageData]);

  return (
    <>
      {mainMenu && (
        <MainMenu
          mainMenu={mainMenu}
          localizations={pageData.attributes.localizations.data}
          globalMenu={globalMenu}
          currentPageCategory={currentPageCategory}
        />
      )}
      <main className="flex lg:grid lg:grid-cols-12">
        <div className="col-start-3 col-span-10 relative w-full min-h-screen flex flex-col justify-between">
          <div>
            {globalMenu && (
              <GlobalMenu
                globalMenu={globalMenu}
                currentPageCategory={currentPageCategory}
              />
            )}
            <motion.div
              key={asPath + locale}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          </div>
          {footerMenu && (
            <FooterMenu
              links={
                pageData.attributes.global_category.data.attributes.footerMenu
                  .links
              }
            />
          )}
        </div>
      </main>
      <ScrollToTopButton />
    </>
  );
}
