import { ReactNode } from "react";

interface IGridLaoutProps {
  children: ReactNode;
}

export default function GridLayout({ children }: IGridLaoutProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {children}
    </ul>
  );
}
