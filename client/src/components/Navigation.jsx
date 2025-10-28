import { useEffect, useState } from "react";
import { clsx } from "clsx";

const navLinks = [
  { href: "#collections", label: "Collections" },
  { href: "#new-arrivals", label: "New" },
  { href: "#stories", label: "Stories" },
  { href: "#contact", label: "Contact" }
];

function Navigation() {
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
        <a className="navigation__brand" href="#hero">
          Shopper <span>YAS</span>
        </a>
        <nav className="navigation__menu" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navigation__actions">
          <button type="button" className="navigation__icon" aria-label="Open search">
            <span aria-hidden>🔍</span>
          </button>
          <button type="button" className="navigation__icon" aria-label="View favorites">
            <span aria-hidden>🤍</span>
          </button>
          <button type="button" className="navigation__cta">
            Shop the drop
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
