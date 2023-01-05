import StrapiImage from "@components/strapiImage";
import useNavToggler from "@libs/client/useNavToggler";

import { IImage, ILink, ILinkWrapper } from "@libs/types";
import { cls } from "@libs/utils";
import { useState } from "react";
import Links from "./links";

import Submenu from "./submenu";

interface IMainMenuProps {
  logo: IImage;
  links: ILinkWrapper[];
}

export function MainMenu({ logo, links }: IMainMenuProps) {
  const [submenu, setSubmenu] = useState<ILink[] | null>(null);
  const { btnRef, menuRef, showing } = useNavToggler<
    HTMLButtonElement,
    HTMLElement
  >();

  return (
    <>
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-full grid grid-cols-12 pointer-events-none [&>*]:pointer-events-auto z-10
        ${cls(showing ? "visible opacity-100" : "invisible opacity-0")}
        lg:visible lg:opacity-100
        `}
      >
        <div
          className={`bg-blue text-white col-span-12 lg:col-span-2 text-center lg:text-start w-full h-full p-5`}
        >
          <div className="w-full h-20 overflow-hidden relative flex justify-center items-center mb-5">
            <StrapiImage
              className="object-contain w-full h-full"
              image={logo}
            />
          </div>
          <Links links={links} />
        </div>

        {/* {submenu && <Submenu links={submenu} />} */}
      </nav>

      <button
        ref={btnRef}
        className="fixed bottom-0 right-0 bg-red-400 z-50 visible opacity-100 lg:invisible lg:opacity-0"
      >
        {showing ? "close" : "menu"}
      </button>
    </>
  );
}
