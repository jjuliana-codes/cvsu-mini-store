import "./SearchBar.css";

const CATEGORIES = ["All", "Electronics", "Books", "School Supplies", "Accessories"];

// Controlled component: every value comes from props (state in App.jsx),
// and every change calls a handler that updates that state.
function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClear,
}) {
  return (
    <section className="search-bar" aria-label="Search and filter products">
      <div className="search-field search-field--grow">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="search-field">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="search-field">
        <label htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <button type="button" className="clear-filters" onClick={onClear}>
        Clear Filters
      </button>
    </section>
  );
}

export default SearchBar;