interface FooterLinksProps {
  termsLabel: string;
  privacyLabel: string;
  email: string;
}

function FooterLinks({ termsLabel, privacyLabel, email }: FooterLinksProps): JSX.Element {
  return (
    <div className="footer__links">
      <a href="/terms">{termsLabel}</a>
      <a href="/privacy">{privacyLabel}</a>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
}

export default FooterLinks;
