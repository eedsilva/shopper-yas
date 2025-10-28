import { useTranslation } from "react-i18next";

function ProductTileFooter({ price, variant }) {
  const { t } = useTranslation();

  return (
    <div className="product-tile__footer">
      <span className="product-tile__price">{price}</span>
      <button
        type="button"
        className="product-tile__button"
        data-variant={variant ?? "default"}
      >
        {t("products.tile.addToBag")}
      </button>
    </div>
  );
}

export default ProductTileFooter;
