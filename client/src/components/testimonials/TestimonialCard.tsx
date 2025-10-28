import type { Testimonial } from "../../types";

type TestimonialCardProps = Testimonial;

function TestimonialCard({ quote, name, role }: TestimonialCardProps): JSX.Element {
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
