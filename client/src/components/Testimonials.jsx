import { TestimonialCard, testimonials } from "./testimonials";

function Testimonials() {
  return (
    <section className="testimonials" id="stories">
      <div className="testimonials__inner">
        <div className="testimonials__intro">
          <p className="section-eyebrow">Loved by the community</p>
          <h2>Modern luxury rooted in responsibility</h2>
          <p>
            Our collections balance elevated design with mindful production, so you can express your
            personal style and feel good about every piece you wear.
          </p>
        </div>
        <div className="testimonials__list">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
