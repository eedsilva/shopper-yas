import { useMessages } from "../contexts/LocalizationContext";
import { FooterLinks, NewsletterForm } from "./footer/index.ts";

function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const { footer } = useMessages();

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3>{footer.stayInLoop}</h3>
          <p>{footer.description}</p>
          <NewsletterForm />
        </div>
        <div className="footer__meta">
          <p>
            © {year} Shopper YAS. {footer.rights}
          </p>
          <FooterLinks email={footer.contactEmail} termsLabel={footer.terms} privacyLabel={footer.privacy} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
