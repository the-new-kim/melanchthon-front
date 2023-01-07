import { ReactNode } from "react";

interface ISectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({ children }: ISectionTitleProps) {
  return <h3 className="mb-5">{children}</h3>;
}
