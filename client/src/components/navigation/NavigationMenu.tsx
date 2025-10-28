import { useMessages } from "../../contexts/LocalizationContext";

function NavigationMenu(): JSX.Element {
  const { navigation } = useMessages();
  const navLinks = navigation.menu;

  return (
    <nav className="navigation__menu" aria-label="Primary">
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
