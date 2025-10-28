import { useMessages } from "../../contexts/LocalizationContext";

function NewsletterForm(): JSX.Element {
  const { footer } = useMessages();
  return (
    <form className="footer__form">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input id="email" type="email" name="email" placeholder={footer.emailPlaceholder} required />
      <button type="submit">{footer.joinCta}</button>
    </form>
  );
}

export default NewsletterForm;
