import StrapiImage from "@components/strapiImage";
import useNavToggler from "@libs/client/useNavToggler";

import { IImage, ILink, ILinkWrapper } from "@libs/types";
import { cls } from "@libs/utils";
import { useEffect, useState } from "react";
import Links from "./links";
import { AnimatePresence, motion } from "framer-motion";

import Submenu from "./submenu";

interface IMainMenuProps {
  logo: IImage;
  links: ILinkWrapper[];
}

export function MainMenu({ logo, links }: IMainMenuProps) {
  const [submenu, setSubmenu] = useState<ILink[] | null>(null);
  const { btnRef, menuRef, showing } = useNavToggler<
    HTMLDivElement,
    HTMLElement
  >();

  const [pageId, setPageId] = useState(links[0].page.data.id);

  useEffect(() => {
    setPageId(links[0].page.data.id);
  }, [links]);

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <motion.nav
          key={pageId + "nav"}
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
          <div
            className={`bg-blue text-white col-span-12 lg:col-span-2 text-center lg:text-start w-full h-full p-5`}
          >
            <motion.div
              key={pageId + "logo"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", ease: "easeOut" }}
              className="w-full h-20 overflow-hidden relative flex justify-center items-center mb-5"
            >
              <StrapiImage
                className="object-contain w-full h-full"
                image={logo}
              />
            </motion.div>
            <Links links={links} pageId={pageId} />
          </div>

          {/* {submenu && <Submenu links={submenu} />} */}
        </motion.nav>
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
