import { IGlobalMenu, IMainMenu } from "@libs/types";
import { ReactNode } from "react";
import GlobalMenu from "./globalMenu";
import { MainMenu } from "./mainMenu/index";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface ILayoutProps {
  children: ReactNode;
  mainMenu: IMainMenu;
  globalMenu: IGlobalMenu;
  currentPageCategory: string;
}
export default function Layout({
  children,
  mainMenu,
  globalMenu,
  currentPageCategory,
}: ILayoutProps) {
  const { asPath, locale } = useRouter();

  return (
    <>
      {mainMenu && (
        <MainMenu logo={mainMenu.logo.data} links={mainMenu.links} />
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
