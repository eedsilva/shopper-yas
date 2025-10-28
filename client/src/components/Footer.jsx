function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3>Stay in the loop</h3>
          <p>Receive styling notes, early access, and exclusive invitations.</p>
          <form className="footer__form">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input id="email" type="email" name="email" placeholder="you@example.com" required />
            <button type="submit">Join the list</button>
          </form>
        </div>
        <div className="footer__meta">
          <p>© {year} Shopper YAS. All rights reserved.</p>
          <div className="footer__links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="mailto:hello@shopperyas.com">hello@shopperyas.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
