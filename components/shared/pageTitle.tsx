import { ReactNode } from "react";

interface IPageTitleProps {
  children: ReactNode;
}

export default function PageTitle({ children }: IPageTitleProps) {
  return (
    <>
      <h2>{children}</h2>
      <hr className="mb-20" />
    </>
  );
}
