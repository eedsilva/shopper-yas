function ProductsSectionHeader({ title, eyebrow, ctaLabel, onCtaClick }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {ctaLabel ? (
        <button type="button" className="section-cta" onClick={onCtaClick}>
          {ctaLabel}
        </button>
      ) : null}
    </div>
  );
}

export default ProductsSectionHeader;
