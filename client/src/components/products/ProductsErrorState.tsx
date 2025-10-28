interface ProductsErrorStateProps {
  message: string | null;
  description: string;
  retryLabel: string;
  onRetry: () => void;
}

function ProductsErrorState({ message, description, retryLabel, onRetry }: ProductsErrorStateProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <div className="products__error" role="alert">
      <p>
        {description} {message}
      </p>
      <button type="button" onClick={onRetry}>
        {retryLabel}
      </button>
    </div>
  );
}

export default ProductsErrorState;
