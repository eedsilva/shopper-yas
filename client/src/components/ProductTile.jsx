import { clsx } from "clsx";

function ProductTile({ product, variant }) {
  if (!product) return null;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(product.price ?? 0);

  return (
    <article
      className={clsx("product-tile", {
        "product-tile--spotlight": variant === "spotlight"
      })}
    >
      <div className="product-tile__media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-tile__content">
        <p className="product-tile__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-tile__description">{product.description}</p>
        <div className="product-tile__footer">
          <span className="product-tile__price">{price}</span>
          <button type="button" className="product-tile__button">
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductTile;
