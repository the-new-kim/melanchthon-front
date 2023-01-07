import StrapiImage from "@components/strapiImage";
import useNavToggler from "@libs/client/useNavToggler";

import { ILink, ILocalization, IMainMenu } from "@libs/types";
import { cls } from "@libs/utils";
import { useEffect, useState } from "react";
import Links from "./links";
import { AnimatePresence, motion } from "framer-motion";

import Submenu from "./submenu";
import Link from "next/link";

interface IMainMenuProps {
  mainMenu: IMainMenu;
  localizations: ILocalization[];
}

export function MainMenu({ mainMenu, localizations }: IMainMenuProps) {
  // const [logo, setLogo] = useState(mainMenu.logo.data);
  // const [links, setLinks] = useState(mainMenu.links);
  const logo = mainMenu.logo.data;
  const links = mainMenu.links;
  const [submenu, setSubmenu] = useState<ILink[] | null>(null);

  const { btnRef, menuRef, showing } = useNavToggler<
    HTMLDivElement,
    HTMLDivElement
  >();

  const [pageId, setPageId] = useState(links[0].page.data.id);

  useEffect(() => {
    setPageId(links[0].page.data.id);
  }, [links, mainMenu]);

  // useEffect(() => {
  //   setLogo(mainMenu.logo.data);
  //   setLinks(mainMenu.links);
  // }, [mainMenu]);

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <div
          // key={pageId + "nav"}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          // transition={{ type: "tween", ease: "easeOut" }}
          ref={menuRef}
          className={`fixed top-0 left-0 w-full h-full grid grid-cols-12 pointer-events-none [&>*]:pointer-events-auto z-50
        ${cls(showing ? "visible opacity-100" : "invisible opacity-0")}
        lg:visible lg:opacity-100
        transition-all duration-300
        `}
        >
          <nav className="bg-blue text-white col-span-12 lg:col-span-2 text-center lg:text-start w-full h-full p-5">
            <div className="flex flex-col justify-between w-full h-full">
              {/* MAIN MENU */}
              <div>
                <motion.div
                  key={logo.id + "logo"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween", ease: "easeOut" }}
                  className="w-full h-20 overflow-hidden relative flex justify-center items-center mb-10 lg:mb-5"
                >
                  <StrapiImage
                    className="object-contain w-full h-full"
                    image={logo}
                  />
                </motion.div>
                <Links links={links} pageId={pageId} />
              </div>

              {/* LOCALIZATIONS */}
              <div className="py-10">
                <ul className="text-xl lg:text-base flex justify-center items-center">
                  {localizations.map((locale) => (
                    <motion.li
                      key={locale.id + "locale"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "tween", ease: "easeOut" }}
                    >
                      <Link
                        href={locale.attributes.url}
                        locale={locale.attributes.locale}
                      >
                        {locale.attributes.locale}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* {submenu && <Submenu links={submenu} />} */}
        </div>
      </AnimatePresence>
      <div
        ref={btnRef}
        className="fixed bottom-5 right-5 bg-blue text-white border-2 p-3 rounded-lg z-50 visible opacity-100 lg:invisible lg:opacity-0
        cursor-pointer transition-all duration-300
        "
      >
        {showing ? "close" : "menu"}
      </div>
    </>
  );
}
