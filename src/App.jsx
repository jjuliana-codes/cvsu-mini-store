import { useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import "./App.css";

// Badge labels by product id
const badges = { 1: "New", 2: "Sale" };

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  function handleAddToCart(productTitle) {
    setCartCount((count) => count + 1);
    setLastAdded(productTitle);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>CVSU Mini Store</h1>
        <p>Mini Product Catalog</p>
      </header>

      <section className="cart-message" aria-live="polite">
        {cartCount === 0 ? (
          <strong>Your cart is empty.</strong>
        ) : (
          <strong>
            Items in cart: <span className="cart-count">{cartCount}</span>
            <span className="cart-last">Last added: {lastAdded}</span>
          </strong>
        )}
      </section>

      <main className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            badge={badges[product.id]}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>
    </div>
  );
}

export default App;