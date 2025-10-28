const navLinks = [
  { href: "#collections", label: "Collections" },
  { href: "#new-arrivals", label: "New" },
  { href: "#stories", label: "Stories" },
  { href: "#contact", label: "Contact" }
];

function NavigationMenu() {
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
