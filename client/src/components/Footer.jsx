import { FooterLinks, NewsletterForm } from "./footer";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3>Stay in the loop</h3>
          <p>Receive styling notes, early access, and exclusive invitations.</p>
          <NewsletterForm />
        </div>
        <div className="footer__meta">
          <p>© {year} Shopper YAS. All rights reserved.</p>
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
