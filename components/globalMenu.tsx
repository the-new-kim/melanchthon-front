import { IGlobalMenu } from "@libs/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface IGlobalMenuProps {
  globalMenu: IGlobalMenu;
  currentPageCategory: string;
}

export default function GlobalMenu({
  globalMenu,
  currentPageCategory,
}: IGlobalMenuProps) {
  return (
    <ul className="flex justify-around text-center absolute top-0 left-0 w-full z-10">
      {globalMenu.links.map((link) => {
        const linkData = link.global_category.data;

        if (linkData)
          return (
            <li className="w-full" key={link.id}>
              <Link href={linkData.attributes.homepage.data.attributes.url}>
                <div className="w-full h-3">
                  {linkData.attributes.title === currentPageCategory && (
                    <motion.div
                      key="globalMenuBar"
                      layoutId="globalMenuBar"
                      className="w-full h-full bg-[#B6983B]"
                    />
                  )}
                </div>

                <div>{linkData.attributes.title}</div>
              </Link>
            </li>
          );
        return null;
      })}
    </ul>
  );
}
