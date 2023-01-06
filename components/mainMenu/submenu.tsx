import { ILink, ILinkWrapper } from "@libs/types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import Links from "./links";

interface ISubmenuProps {
  links: ILinkWrapper[] | ILink[];
  pageId: number;
}

export default function Submenu({ links, pageId }: ISubmenuProps) {
  const submenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={submenuRef}
      className="relative h-screen bg-red-400 text-white col-span-10 border-white border-l-[1px] p-5"
    >
      <button className="absolute top-0 right-0 p-5">Close</button>
      <Links subLinks={links} pageId={pageId} />
    </div>
  );
}
