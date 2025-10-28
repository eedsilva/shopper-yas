import { useTranslation } from "react-i18next";

function NavigationMenu() {
  const { t } = useTranslation();
  const navLinks = [
    { href: "#collections", label: t("navigation.menu.links.collections") },
    { href: "#new-arrivals", label: t("navigation.menu.links.new") },
    { href: "#stories", label: t("navigation.menu.links.stories") },
    { href: "#contact", label: t("navigation.menu.links.contact") }
  ];

  return (
    <nav className="navigation__menu" aria-label={t("navigation.menu.ariaLabel")}>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
