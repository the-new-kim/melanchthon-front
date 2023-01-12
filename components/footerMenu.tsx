import { ILink } from "@libs/types";
import { cls } from "@libs/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface IFotterMenuProps {
  links: ILink[];
}

export default function FooterMenu({ links }: IFotterMenuProps) {
  const { asPath } = useRouter();

  return (
    <footer className="bg-green p-5 mt-10 font-sans font-bold">
      <ul>
        {links.map(
          (link) =>
            link.page.data && (
              <li
                key={link.id}
                className={`${cls(
                  link.page.data.attributes.url === asPath ? "text-white" : ""
                )} transition-colors duration-300`}
              >
                <Link href={link.page.data.attributes.url}>{link.label}</Link>
              </li>
            )
        )}
      </ul>
    </footer>
  );
}
