function HighlightCard({ icon, title, description }) {
  return (
    <article className="highlight-card">
      <span className="highlight-card__icon" aria-hidden>
        {icon}
      </span>
      <div className="highlight-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default HighlightCard;
