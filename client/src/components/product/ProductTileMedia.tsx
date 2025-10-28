interface ProductTileMediaProps {
  image: string;
  name: string;
}

function ProductTileMedia({ image, name }: ProductTileMediaProps): JSX.Element {
  return (
    <div className="product-tile__media">
      <img src={image} alt={name} loading="lazy" />
    </div>
  );
}

export default ProductTileMedia;
