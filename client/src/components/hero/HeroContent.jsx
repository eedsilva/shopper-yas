function HeroContent({ slide }) {
  return (
    <div className="hero__content">
      <p className="hero__eyebrow">New Season · Limited Run</p>
      <h1>{slide.title}</h1>
      <p className="hero__description">{slide.description}</p>
      <div className="hero__cta-group">
        <button type="button" className="hero__cta hero__cta--primary">
          Explore collection
        </button>
        <button type="button" className="hero__cta hero__cta--ghost">
          Watch the story
        </button>
      </div>
    </div>
  );
}

export default HeroContent;
