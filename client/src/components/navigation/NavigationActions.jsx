function NavigationActions() {
  return (
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
  );
}

export default NavigationActions;
