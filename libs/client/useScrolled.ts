import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function useScrolled(triggerPosition: number) {
  const { scrollY } = useScroll();
  const [state, setState] = useState(false);

  useMotionValueEvent(scrollY, "change", (currentPosition) =>
    currentPosition > triggerPosition ? setState(true) : setState(false)
  );

  return state;
}
