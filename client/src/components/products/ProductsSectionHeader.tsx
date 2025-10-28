interface ProductsSectionHeaderProps {
  title: string;
  eyebrow?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

function ProductsSectionHeader({ title, eyebrow, ctaLabel, onCtaClick }: ProductsSectionHeaderProps): JSX.Element {
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
