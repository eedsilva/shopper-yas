import ProductTile from "../ProductTile";
import ProductTileSkeleton from "../ProductTileSkeleton";

function ProductsGrid({ isLoading, products, spotlight }) {
  if (isLoading) {
    return (
      <div className="products__grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductTileSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="products__grid">
      {spotlight ? <ProductTile product={spotlight} variant="spotlight" /> : null}
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsGrid;
