import { HighlightCard, highlights } from "./highlights";

function FeatureHighlights() {
  return (
    <section className="highlights" id="collections">
      <div className="highlights__inner">
        {highlights.map((highlight) => (
          <HighlightCard key={highlight.id} {...highlight} />
        ))}
      </div>
    </section>
  );
}

export default FeatureHighlights;
