function ProductTileMedia({ image, name }) {
  return (
    <div className="product-tile__media">
      <img src={image} alt={name} loading="lazy" />
    </div>
  );
}

export default ProductTileMedia;
