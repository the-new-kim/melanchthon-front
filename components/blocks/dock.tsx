import useScrolled from "@libs/client/useScrolled";
import { IBlock, ILink } from "@libs/types";
import { cls } from "@libs/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import { useEffect, useState } from "react";

interface IDockLinkProps {
  link: ILink;
}

const DockLink = ({ link }: IDockLinkProps) => {
  const { asPath } = useRouter();

  return (
    <li key={link.id} className="p-3 whitespace-nowrap">
      <Link href={link.href} target={link.target} className="relative py-1">
        {link.label}
        {asPath.includes(link.href) && (
          <div
            key="dockUnderline"
            // layoutId="dockUnderline"
            className="w-full h-1 bg-orange absolute bottom-0 left-0"
          />
        )}
      </Link>
    </li>
  );
};

export interface IDockProps extends IBlock {
  links: ILink[];
}

export default function Dock({ links }: IDockProps) {
  const { asPath } = useRouter();
  const [matchedLink, setMatchedLink] = useState(
    links.find((link) => asPath.includes(link.href))
  );
  const scrolled = useScrolled(100);

  const [navOpen, setNavOpen] = useState(false);
  const toggleNavOpen = () => {
    setNavOpen((prev) => !prev);
  };

  useEffect(() => {
    setMatchedLink(links.find((link) => asPath.includes(link.href)));
  }, [asPath]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-5">
      <div className="flex lg:grid lg:grid-cols-12 w-full">
        <div className="lg:col-start-3 lg:col-span-10 relative flex items-center justify-start w-full">
          <div
            className={`${cls(
              scrolled ? "translate-y-3" : "translate-y-10 md:translate-y-20"
            )} transition-transform duration-300
            relative max-w-full
            `}
          >
            {/* DROP SHADOW */}
            <div className="absolute w-full h-full drop-shadow-2xl bg-white opacity-70 rounded-lg -z-10" />

            {/* DESK TOP */}
            <ul className="hidden md:flex justify-start items-center w-full overflow-hidden">
              {links.map((link) => (
                <DockLink key={link.id} link={link} />
              ))}
            </ul>

            {/* Mobile */}
            <ul
              className="flex flex-col justify-start items-center w-full overflow-hidden
            md:hidden"
            >
              {!navOpen && matchedLink ? (
                <DockLink key={matchedLink!.id} link={matchedLink!} />
              ) : (
                links.map((link) => <DockLink key={link.id} link={link} />)
              )}

              <li className="p-0 ">
                <button onClick={toggleNavOpen}>
                  <CaretDown
                    weight="bold"
                    className={`${cls(
                      navOpen ? "rotate-180" : "rotate-0"
                    )} transition-transform duration-300 ease-out`}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
