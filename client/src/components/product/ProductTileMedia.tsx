interface ProductTileMediaProps {
  image: string | null;
  name: string;
}

function ProductTileMedia({ image, name }: ProductTileMediaProps): JSX.Element {
  const fallback =
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80";
  const resolvedImage = image || fallback;

  return (
    <div className="product-tile__media">
      <img src={resolvedImage} alt={name} loading="lazy" />
    </div>
  );
}

export default ProductTileMedia;
