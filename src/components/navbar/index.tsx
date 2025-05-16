import AnimatedList from "../../components/animatedList";
import MenuToggle from "../../components/menuToggle";
import clsx from "clsx";
import { easeIn, motion, useScroll, useTransform } from "framer-motion";
import { useContext, useState } from "react";
import { ConfigContext } from "../../utils/configContext";

function Navbar() {
  const {
    name,
    logo,
    topNavbar,
  } = useContext(ConfigContext)!;

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1 / 3], [0, 12], {
    ease: easeIn,
  });
  const width = useTransform(scrollYProgress, [0, 1 / 3], ["100%", "80%"], {
    ease: easeIn,
  });
  const opacity = useTransform(scrollYProgress, [0, 1 / 3], [0, 1], {
    ease: easeIn,
  });

  return (
    <motion.nav
      className="opacity-0 max-w-screen-lg mx-auto sticky top-0 z-50"
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={{
          width:
            isMobileNavVisible || topNavbar.disableWidthAnimation
              ? "100%"
              : width,
          translateY: isMobileNavVisible ? 0 : y,
        }}
        className="will-change-[width,transform] transition-all mx-auto navbar relative px-4 max-md:!w-full"
      >
        <motion.div
          style={{ opacity: isMobileNavVisible ? 1 : opacity }}
          className={clsx(
            "will-change-[border-radius,opacity] transition-all z-[-1] rounded-full absolute left-0 right-0 top-0 bottom-0 bg-base-100 shadow-xl",
            {
              "rounded-none": isMobileNavVisible,
            }
          )}
        />
        <div className="navbar-start">
          <a href="/" className="flex items-center">
            <img className="h-16" src={logo} alt="logo" />
            <span className="font-bold mx-1 md:text-lg">{name}</span>
          </a>
        </div>
        <div className="navbar-end md:hidden">
          <MenuToggle
            toggle={() => setIsMobileNavVisible((current) => !current)}
            isOpen={isMobileNavVisible}
          />
        </div>
        <div className="navbar-end hidden font-semibold md:flex">
          <ul className="flex gap-4 px-1 items-center">
            {topNavbar.links.map(({ title, href }, index) => (
              <li key={index}>
                <a
                  className="text-sm whitespace-nowrap link link-hover"
                  href={href}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <AnimatedList
        listKey="mobile-navbar"
        listClassName="absolute bg-base-100 top-20 shadow-lg rounded-b-lg w-full px-4 flex flex-col gap-2 md:hidden"
        isVisible={isMobileNavVisible}
      >
        {topNavbar.links.map(({ title, href }, index) => (
          <motion.a
            key={index}
            className="btn btn-ghost w-full"
            href={href}
            variants={{
              show: { x: 0 },
              hidden: { x: "-100%" },
            }}
          >
            {title}
          </motion.a>
        ))}
      </AnimatedList>
    </motion.nav>
  );
}

export default Navbar;
