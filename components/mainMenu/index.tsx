import StrapiImage from "@components/strapiImage";
import { IImage, ILink, ILinkWrapper } from "@libs/types";
import { useState } from "react";
import Links from "./links";
import Submenu from "./submenu";

interface IMainMenuProps {
  logo: IImage;
  links: ILinkWrapper[];
}

export function MainMenu({ logo, links }: IMainMenuProps) {
  const [submenu, setSubmenu] = useState<ILink[] | null>(null);

  return (
    <nav className="fixed top-0 left-0 w-full h-full grid grid-cols-12 pointer-events-none [&>*]:pointer-events-auto z-10">
      <div className="bg-blue text-white col-span-2 w-full h-full p-5">
        <div className="w-full h-20 overflow-hidden relative flex justify-center items-center mb-5">
          <StrapiImage className="object-contain w-full h-full" image={logo} />
        </div>
        <Links links={links} />
      </div>

      {submenu && <Submenu links={submenu} />}
    </nav>
  );
}
