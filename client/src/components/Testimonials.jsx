import { useTranslation } from "react-i18next";
import { TestimonialCard, testimonials } from "./testimonials";

function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="testimonials" id="stories">
      <div className="testimonials__inner">
        <div className="testimonials__intro">
          <p className="section-eyebrow">{t("testimonials.intro.eyebrow")}</p>
          <h2>{t("testimonials.intro.title")}</h2>
          <p>{t("testimonials.intro.description")}</p>
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
