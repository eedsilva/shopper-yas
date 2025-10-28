import { useTranslation } from "react-i18next";
import { FooterLinks, NewsletterForm } from "./footer";

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3>{t("footer.brand.heading")}</h3>
          <p>{t("footer.brand.description")}</p>
          <NewsletterForm />
        </div>
        <div className="footer__meta">
          <p>{t("footer.meta.copy", { year })}</p>
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
