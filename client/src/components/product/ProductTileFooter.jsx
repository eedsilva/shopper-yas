function ProductTileFooter({ price, variant }) {
  return (
    <div className="product-tile__footer">
      <span className="product-tile__price">{price}</span>
      <button
        type="button"
        className="product-tile__button"
        data-variant={variant ?? "default"}
      >
        Add to bag
      </button>
    </div>
  );
}

export default ProductTileFooter;
