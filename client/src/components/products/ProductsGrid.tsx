import type { Product } from "../../types";
import ProductTile from "../ProductTile";
import ProductTileSkeleton from "../ProductTileSkeleton";

interface ProductsGridProps {
  isLoading: boolean;
  products: Product[];
  spotlight: Product | null;
}

function ProductsGrid({ isLoading, products, spotlight }: ProductsGridProps): JSX.Element {
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
