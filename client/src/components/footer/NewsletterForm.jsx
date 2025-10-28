function NewsletterForm() {
  return (
    <form className="footer__form">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input id="email" type="email" name="email" placeholder="you@example.com" required />
      <button type="submit">Join the list</button>
    </form>
  );
}

export default NewsletterForm;
