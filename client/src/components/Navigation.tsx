import { useEffect, useState } from "react";
import { clsx } from "clsx";

import { NavigationActions, NavigationBrand, NavigationMenu } from "./navigation";

function Navigation(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx("navigation", {
        "navigation--scrolled": isScrolled
      })}
    >
      <div className="navigation__inner">
        <NavigationBrand />
        <NavigationMenu />
        <NavigationActions />
      </div>
    </header>
  );
}

export default Navigation;
