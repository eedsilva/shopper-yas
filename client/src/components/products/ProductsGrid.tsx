import type { Product } from "../../types";
import ProductTile from "../ProductTile";
import ProductTileSkeleton from "../ProductTileSkeleton";

interface ProductsGridProps {
  isLoading: boolean;
  products: Product[];
  spotlight: Product | null;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  addLabel: string;
}

function ProductsGrid({
  isLoading,
  products,
  spotlight,
  onSelectProduct,
  onAddToCart,
  addLabel
}: ProductsGridProps): JSX.Element {
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
      {spotlight ? (
        <ProductTile
          product={spotlight}
          variant="spotlight"
          onSelect={onSelectProduct}
          onAddToCart={onAddToCart}
          addLabel={addLabel}
        />
      ) : null}
      {products.map((product) => (
        <ProductTile
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
          onAddToCart={onAddToCart}
          addLabel={addLabel}
        />
      ))}
    </div>
  );
}

export default ProductsGrid;
