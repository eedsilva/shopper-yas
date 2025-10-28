import type { ProductTileVariant } from "../../types";

interface ProductTileFooterProps {
  price: string;
  variant?: ProductTileVariant;
  onAddToCart?: () => void;
  label: string;
}

function ProductTileFooter({ price, variant, onAddToCart, label }: ProductTileFooterProps): JSX.Element {
  return (
    <div className="product-tile__footer">
      <span className="product-tile__price">{price}</span>
      <button
        type="button"
        className="product-tile__button"
        data-variant={variant ?? "default"}
        onClick={(event) => {
          event.stopPropagation();
          onAddToCart?.();
        }}
      >
        {label}
      </button>
    </div>
  );
}

export default ProductTileFooter;
