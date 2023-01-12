import { ReactNode } from "react";

interface IBlockLayout {
  children: ReactNode;
}

export default function BlockLayout({ children }: IBlockLayout) {
  return <section className="p-5 pt-20">{children}</section>;
}
