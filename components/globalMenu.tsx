import { IGlobalMenu } from "@libs/types";
import { motion } from "framer-motion";
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
    <div className="flex absolute top-0 left-0 w-full text-center z-10">
      <ul className="flex justify-around w-full">
        {globalMenu.links.map((link) => {
          const linkData = link.global_category.data;

          if (linkData)
            return (
              <li
                className="flex"
                style={{ width: `${100 / globalMenu.links.length}%` }}
                key={link.id}
              >
                {linkData.attributes.homepage.data?.attributes.slug && (
                  <Link
                    href={linkData.attributes.homepage.data?.attributes.slug}
                    className="h-fit w-full pb-3"
                  >
                    <div className="w-full h-3">
                      {linkData.attributes.title === currentPageCategory && (
                        <motion.div
                          key="globalMenuBar"
                          layoutId="globalMenuBar"
                          className="w-full h-full bg-[#B6983B]"
                        />
                      )}
                    </div>

                    <h5>{linkData.attributes.title}</h5>
                  </Link>
                )}
              </li>
            );
          return null;
        })}
      </ul>

      {/* GRADIENT BG */}

      <div className="pointer-events-none absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent -z-10" />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/20 to-transparent -z-10" />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/20 to-transparent -z-10" />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/20 to-transparent -z-10" />
    </div>
  );
}
