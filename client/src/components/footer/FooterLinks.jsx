import { useTranslation } from "react-i18next";

function FooterLinks() {
  const { t } = useTranslation();

  return (
    <div className="footer__links">
      <a href="/terms">{t("footer.links.terms")}</a>
      <a href="/privacy">{t("footer.links.privacy")}</a>
      <a href="mailto:hello@shopperyas.com">{t("footer.links.email")}</a>
    </div>
  );
}

export default FooterLinks;
