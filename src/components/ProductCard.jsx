import "./ProductCard.css";

function ProductCard({
  title,
  price,
  category = "General",
  inStock = true,
  badge,
  onAddToCart,
}) {
  const formattedPrice = Number(price).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article className={`product-card ${inStock ? "" : "out-of-stock"}`}>
      {/* Only render the badge when a label is actually passed in */}
      {badge && <span className="product-badge">{badge}</span>}

      <h3 className="product-title">{title}</h3>
      <p className="product-category">{category}</p>
      <p className="product-price">₱{formattedPrice}</p>

      <p className={`product-stock ${inStock ? "available" : "unavailable"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>

      <button
        className="add-to-cart"
        disabled={!inStock}
        onClick={() => onAddToCart?.(title)}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;