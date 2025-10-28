const highlights = [
  {
    id: 1,
    title: "Mindful Materials",
    description: "Organic cotton, regenerative fibers, and recycled trims crafted for longevity.",
    icon: "🌱"
  },
  {
    id: 2,
    title: "Fairly Made",
    description: "We partner with ateliers that champion safe, equitable working environments.",
    icon: "🤝"
  },
  {
    id: 3,
    title: "Circular Future",
    description: "Complimentary repair services and resale marketplace keep garments in rotation.",
    icon: "♻️"
  }
];

function FeatureHighlights() {
  return (
    <section className="highlights" id="collections">
      <div className="highlights__inner">
        {highlights.map((highlight) => (
          <article key={highlight.id} className="highlight-card">
            <span className="highlight-card__icon" aria-hidden>
              {highlight.icon}
            </span>
            <div className="highlight-card__body">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeatureHighlights;
