import { useMessages } from "../contexts/LocalizationContext";
import { HighlightCard } from "./highlights";

function FeatureHighlights(): JSX.Element {
  const { highlights } = useMessages();
  return (
    <section className="highlights" id="collections">
      <div className="highlights__inner">
        {highlights.items.map((highlight) => (
          <HighlightCard key={highlight.id} {...highlight} />
        ))}
      </div>
    </section>
  );
}

export default FeatureHighlights;
