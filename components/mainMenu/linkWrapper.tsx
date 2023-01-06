import { ILink } from "@libs/types";
import { useRouter } from "next/router";

interface ILinkWrapperProps {
  label: string;
  subLinks: ILink[];
}

export default function LinkWrapper({ label, subLinks }: ILinkWrapperProps) {
  const router = useRouter();

  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        router.push({ query: { ...router.query, submenu: "showing" } });
      }}
    >
      {label}+
    </span>
  );
}
