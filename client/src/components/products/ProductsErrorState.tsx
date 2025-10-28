interface ProductsErrorStateProps {
  message: string | null;
  onRetry: () => void;
}

function ProductsErrorState({ message, onRetry }: ProductsErrorStateProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <div className="products__error" role="alert">
      <p>We couldn't refresh the latest arrivals. {message}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export default ProductsErrorState;
