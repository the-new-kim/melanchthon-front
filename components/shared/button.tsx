import Link from "next/link";
import { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  href: string;
}

export default function Button({ children, href }: IButtonProps) {
  return (
    <Link href={href} className="bg-slate-400 px-3 py-1 rounded-lg">
      {children}
    </Link>
  );
}
