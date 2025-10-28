import { useTranslation } from "react-i18next";

function ProductsErrorState({ message, onRetry }) {
  const { t } = useTranslation();
  if (!message) return null;

  return (
    <div className="products__error" role="alert">
      <p>{t("products.error.message", { message })}</p>
      <button type="button" onClick={onRetry}>
        {t("products.error.retry")}
      </button>
    </div>
  );
}

export default ProductsErrorState;
