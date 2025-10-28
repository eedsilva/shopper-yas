const testimonials = [
  {
    id: 1,
    quote:
      "Shopper YAS pieces are the backbone of my wardrobe — the tailoring is impeccable and endlessly remixable.",
    name: "Alisha R.",
    role: "Creative Director"
  },
  {
    id: 2,
    quote:
      "The quality is unmatched. I love knowing every piece is crafted with care for both people and planet.",
    name: "Jordan M.",
    role: "Stylist"
  }
];

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
            <figure key={testimonial.id}>
              <blockquote>
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption>
                <span>{testimonial.name}</span>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
