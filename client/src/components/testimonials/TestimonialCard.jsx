function TestimonialCard({ quote, name, role }) {
  return (
    <figure>
      <blockquote>
        <p>“{quote}”</p>
      </blockquote>
      <figcaption>
        <span>{name}</span>
        <span>{role}</span>
      </figcaption>
    </figure>
  );
}

export default TestimonialCard;
