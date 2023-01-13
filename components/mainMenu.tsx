import StrapiImage from "@components/strapiImage";
import useNavToggler from "@libs/client/useNavToggler";

import { ILocalization, IMainMenu } from "@libs/types";
import { cls } from "@libs/utils";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { fadeInVariants } from "@libs/motionVariants";
import { useRouter } from "next/router";
import { List, X } from "phosphor-react";

interface IMainMenuProps {
  mainMenu: IMainMenu;
  localizations: ILocalization[];
}

export function MainMenu({ mainMenu, localizations }: IMainMenuProps) {
  const { asPath } = useRouter();
  const logo = mainMenu.logo.data;
  const links = mainMenu.links;

  const { btnRef, menuRef, showing } = useNavToggler<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <div
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
                {/* LOGO */}
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
                {/* LINKS */}
                <ul>
                  {links.map((link, index) => (
                    <motion.li
                      className="text-2xl mb-3 lg:text-xl lg:mb-0"
                      key={link.id}
                      variants={fadeInVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      custom={index}
                    >
                      <Link
                        href={link.href}
                        target={link.target}
                        className={`${cls(
                          asPath === link.href ? "text-green" : "text-white"
                        )} transition-colors duration-300`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* LOCALIZATIONS */}
              <div className="py-10">
                <ul className="text-base lg:text-sm flex justify-center items-center uppercase">
                  {localizations.map((locale) => (
                    <motion.li
                      key={locale.id + "locale"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "tween", ease: "easeOut" }}
                    >
                      <Link
                        href={locale.attributes.slug}
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
        </div>
      </AnimatePresence>
      <div
        ref={btnRef}
        className="fixed bottom-5 right-5 bg-blue text-white border-2 p-3 rounded-lg z-50 visible opacity-100 lg:invisible lg:opacity-0
        cursor-pointer transition-all duration-300
        "
      >
        {showing ? <X weight="bold" /> : <List weight="bold" />}
      </div>
    </>
  );
}
