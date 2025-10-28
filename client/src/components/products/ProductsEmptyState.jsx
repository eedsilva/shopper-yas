import { useTranslation } from "react-i18next";

function ProductsEmptyState({ visible }) {
  const { t } = useTranslation();
  if (!visible) return null;

  return (
    <div className="products__empty" role="status">
      <p>{t("products.empty.message")}</p>
    </div>
  );
}

export default ProductsEmptyState;
