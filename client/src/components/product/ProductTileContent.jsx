import ProductTileFooter from "./ProductTileFooter";

function ProductTileContent({ product, price, variant }) {
  return (
    <div className="product-tile__content">
      <p className="product-tile__category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="product-tile__description">{product.description}</p>
      {product.tags?.length ? (
        <ul className="product-tile__tags">
          {product.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      <ProductTileFooter price={price} variant={variant} />
    </div>
  );
}

export default ProductTileContent;
