function ProductTileSkeleton() {
  return (
    <article className="product-tile product-tile--skeleton" aria-hidden>
      <div className="product-tile__media" />
      <div className="product-tile__content">
        <div className="skeleton skeleton--pill" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" />
        <div className="product-tile__footer">
          <div className="skeleton skeleton--price" />
          <div className="skeleton skeleton--button" />
        </div>
      </div>
    </article>
  );
}

export default ProductTileSkeleton;
