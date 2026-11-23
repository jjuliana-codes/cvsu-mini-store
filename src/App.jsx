import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import products from "./data/products";
import "./App.css";

// Badge labels by product id
const badges = { 1: "New", 2: "Sale" };

function App() {
  // Lab 3: cart state
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Lab 4 (step 3): search and filter state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Lab 4 (step 4): debounce effect. Only the final pause in typing updates
  // debouncedSearch, because the cleanup cancels the previous timer.
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchText]);

  // Lab 4 (step 5): derive the list to display (original array is not modified)
  const keyword = debouncedSearch.trim().toLowerCase();

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(keyword))
    .filter((p) => category === "All" || p.category === category);

  const visibleProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0; // "default" keeps the original order
  });

  // Lab 4 (step 6): update the browser tab title when the result count changes
  useEffect(() => {
    const n = visibleProducts.length;
    document.title = `CVSU Mini Store (${n} ${n === 1 ? "result" : "results"})`;
  }, [visibleProducts.length]);

  function handleAddToCart(productTitle) {
    setCartCount((count) => count + 1);
    setLastAdded(productTitle);
  }

  // Lab 4 (step 9): reset everything to defaults
  function handleClearFilters() {
    setSearchText("");
    setDebouncedSearch(""); // so the list resets right away, without the 300 ms wait
    setCategory("All");
    setSortOrder("default");
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

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClearFilters}
      />

      {/* Lab 4 (step 7): result count */}
      <p className="results-info">
        Showing {visibleProducts.length} of {products.length} products
      </p>

      {/* Lab 4 (step 8): empty state */}
      {visibleProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try a different keyword or category.
        </p>
      ) : (
        <main className="product-grid">
          {visibleProducts.map((product) => (
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
      )}
    </div>
  );
}

export default App;