import useScrolled from "@libs/client/useScrolled";
import { fadeInVariants } from "@libs/motionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "phosphor-react";

export default function ScrollToTopButton() {
  const showing = useScrolled(100);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {showing && (
          <>
            <motion.div
              variants={fadeInVariants}
              key="topBtnMobile"
              initial="initial"
              animate="animate"
              exit="initial"
              onClick={scrollToTop}
              className="fixed bottom-5 left-5 lg:hidden bg-blue text-white border-2 p-3 rounded-lg z-50 cursor-pointer transition-all duration-300"
            >
              <ArrowUp weight="bold" />
            </motion.div>

            <motion.div
              variants={fadeInVariants}
              key="topBtnDesktop"
              initial="initial"
              animate="animate"
              exit="initial"
              onClick={scrollToTop}
              className="fixed bottom-5 hidden lg:block right-5 bg-blue text-white border-2 p-3 rounded-lg z-50 cursor-pointer transition-all duration-300"
            >
              <ArrowUp weight="bold" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
