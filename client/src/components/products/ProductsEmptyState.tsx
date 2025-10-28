interface ProductsEmptyStateProps {
  visible: boolean;
}

function ProductsEmptyState({ visible }: ProductsEmptyStateProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <div className="products__empty" role="status">
      <p>We're curating the next release. Check back soon.</p>
    </div>
  );
}

export default ProductsEmptyState;
