import { IGlobalMenu, IMainMenu, IPage } from "@libs/types";
import { ReactNode, useEffect, useState } from "react";
import GlobalMenu from "./globalMenu";
import { MainMenu } from "./mainMenu/index";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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

  useEffect(() => {
    setMainMenu(pageData.attributes.global_category.data?.attributes.mainMenu);
  }, [pageData]);

  return (
    <>
      {mainMenu && (
        <MainMenu
          mainMenu={mainMenu}
          localizations={pageData.attributes.localizations.data}
        />
      )}
      <main className="flex lg:grid lg:grid-cols-12">
        <div className="col-start-3 col-span-10 relative w-full">
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
      </main>
    </>
  );
}
