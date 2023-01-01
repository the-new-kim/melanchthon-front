import { ILinkWrapper } from "@libs/types";
import Link from "next/link";

interface IExternalLinkProps {
  label: string;
  url: string;
  openInNewTab: boolean;
}

export default function ExternalLink({
  label,
  url,
  openInNewTab,
}: IExternalLinkProps) {
  return (
    <li>
      <Link href={url} target={openInNewTab ? "_blank" : "_self"}>
        {label}
      </Link>
    </li>
  );
}
