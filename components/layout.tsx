import { IGlobalMenu, IMainMenu } from "@libs/types";
import { ReactNode } from "react";
import GlobalMenu from "./globalMenu";
import { MainMenu } from "./mainMenu";

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
  return (
    <>
      {mainMenu && (
        <MainMenu logo={mainMenu.logo.data} links={mainMenu.links} />
      )}
      <main className="grid grid-cols-12">
        <div className="col-start-3 col-span-10 bg-red-100 p-5 pt-0">
          {globalMenu && (
            <GlobalMenu
              globalMenu={globalMenu}
              currentPageCategory={currentPageCategory}
            />
          )}
          {children}
        </div>
      </main>
    </>
  );
}
