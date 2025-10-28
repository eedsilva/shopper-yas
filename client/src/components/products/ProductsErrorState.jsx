function ProductsErrorState({ message, onRetry }) {
  if (!message) return null;

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
