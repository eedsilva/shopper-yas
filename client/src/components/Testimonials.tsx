import { useMessages } from "../contexts/LocalizationContext";
import { TestimonialCard } from "./testimonials/index.ts";

function Testimonials(): JSX.Element {
  const { testimonials } = useMessages();
  return (
    <section className="testimonials" id="stories">
      <div className="testimonials__inner">
        <div className="testimonials__intro">
          <p className="section-eyebrow">{testimonials.eyebrow}</p>
          <h2>{testimonials.title}</h2>
          <p>{testimonials.description}</p>
        </div>
        <div className="testimonials__list">
          {testimonials.items.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
