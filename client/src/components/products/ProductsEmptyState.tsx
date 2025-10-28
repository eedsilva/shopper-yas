interface ProductsEmptyStateProps {
  visible: boolean;
  message: string;
}

function ProductsEmptyState({ visible, message }: ProductsEmptyStateProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <div className="products__empty" role="status">
      <p>{message}</p>
    </div>
  );
}

export default ProductsEmptyState;
