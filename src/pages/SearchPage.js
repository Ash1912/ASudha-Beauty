import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaSlidersH,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import { usePixelTracking } from "../context/PixelContext";

// Move herbalKeywords outside component to prevent recreation
const herbalKeywords = [
  "multani mitti", "fullers earth", "ubtan", "shikakai", "reetha", "amla",
  "herbal", "ayurvedic", "natural", "organic", "herbal mix", "face pack",
  "clay mask", "oil control", "deep cleansing", "glowing skin",
  "hair care", "skin care", "ayurveda", "traditional", "pure natural",
];

const SearchPage = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const trackEvent = usePixelTracking();

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTracked, setSearchTracked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itemsPerPage = 12;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (query && !searchTracked && filteredResults.length > 0) {
      trackEvent.search(query, filteredResults.length);
      setSearchTracked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filteredResults.length, searchTracked]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
  }, [query]);

  // Main search logic
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setFilteredResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase().trim();

    const results = products.filter((product) => {
      let score = 0;

      if (product.name.toLowerCase() === lowercaseQuery) score += 100;
      else if (product.name.toLowerCase().startsWith(lowercaseQuery))
        score += 50;
      else if (product.name.toLowerCase().includes(lowercaseQuery)) score += 30;

      if (product.category?.toLowerCase().includes(lowercaseQuery)) score += 20;
      if (product.description?.toLowerCase().includes(lowercaseQuery))
        score += 15;
      if (product.ingredients?.toLowerCase().includes(lowercaseQuery))
        score += 10;
      if (
        product.benefits?.some((b) =>
          b.toLowerCase().includes(lowercaseQuery)
        )
      )
        score += 10;

      if (
        herbalKeywords.some(
          (k) => k.includes(lowercaseQuery) || lowercaseQuery.includes(k)
        )
      )
        score += 25;

      return score > 0;
    });

    results.sort((a, b) => {
      const getScore = (product) => {
        let score = 0;
        if (product.name.toLowerCase() === lowercaseQuery) score += 100;
        if (product.name.toLowerCase().startsWith(lowercaseQuery)) score += 50;
        if (product.name.toLowerCase().includes(lowercaseQuery)) score += 30;
        if (product.category === "Skincare") score += 20;
        return score;
      };
      return getScore(b) - getScore(a);
    });

    setSearchResults(results);
    setSearchTracked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Filter + sort
  useEffect(() => {
    let filtered = [...searchResults];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [searchResults, selectedCategory, priceRange, sortBy]);

  // ----- Suggestions (new) -----
  // Show up to 6 product name suggestions + matching herbal keywords
  const suggestions = useMemo(() => {
    if (!query || query.trim().length < 1) return { products: [], keywords: [] };
    const q = query.toLowerCase().trim();

    const productSuggestions = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.ingredients?.toLowerCase().includes(q)
      )
      .slice(0, 6)
      .map((p) => ({ id: p.id, label: p.name }));

    const keywordSuggestions = herbalKeywords
      .filter((k) => k.includes(q) || q.includes(k))
      .slice(0, 6)
      .map((k) => ({ label: k }));

    return { products: productSuggestions, keywords: keywordSuggestions };
  }, [query]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [
    "all", "Face", "Lips", "Eyes", "Skincare", "Sindoor", "Nails",
  ];

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("relevance");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    addToCart(
      product,
      Array.isArray(product.shades) ? product.shades[0] : "",
      1
    );
  };

  const themeStyles = {
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: windowWidth <= 480 ? "1.5rem 1rem" : "2.5rem 1rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#fcf8f5",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      minHeight: "100vh",
      position: "relative",
      // overflow: hidden removed -> prevents navbar scroll trap
      transition: "all 0.3s ease",
    },

    // Blobs now absolute (were fixed) so they stay inside the page
    bgBlob1: {
      position: "absolute",
      top: "-150px",
      right: "-150px",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      opacity: 0.08,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "-150px",
      left: "-150px",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #4caf50, #f7d794)",
      opacity: 0.08,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },

    // --- Suggestions (new) ---
    suggestionsBox: {
      position: "relative",
      zIndex: 1,
      marginBottom: "1.5rem",
      padding: "1rem 1.25rem",
      borderRadius: "16px",
      background: isDarkMode
        ? "rgba(26, 26, 26, 0.85)"
        : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
    },
    suggestionsTitle: {
      fontSize: "0.9rem",
      fontWeight: "700",
      color: isDarkMode ? "#a0a0a0" : "#6d4c41",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    suggestionChips: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    suggestionChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.4rem 0.9rem",
      borderRadius: "50px",
      fontSize: "0.85rem",
      fontWeight: "500",
      textDecoration: "none",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(245, 52, 107, 0.08)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(245,52,107,0.2)"
      }`,
      transition: "all 0.2s ease",
    },

    header: {
      position: "relative",
      zIndex: 1,
      marginBottom: "2rem",
      display: "flex",
      flexDirection: windowWidth <= 768 ? "column" : "row",
      alignItems: windowWidth <= 768 ? "flex-start" : "center",
      justifyContent: "space-between",
      gap: "1rem",
    },
    title: {
      fontSize: windowWidth <= 480 ? "1.5rem" : "2.2rem",
      fontWeight: "900",
      color: isDarkMode ? "#f7d794" : "#c77d42",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      margin: 0,
    },
    resultsCount: {
      color: isDarkMode ? "#a0a0a0" : "#6d4c41",
      margin: "0.5rem 0 0",
      fontSize: "0.95rem",
    },
    query: {
      color: isDarkMode ? "#ffffff" : "#3e2723",
      fontWeight: "700",
    },
    activeFiltersAndSort: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },

    filterButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "50px",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },

    filterSelect: {
      padding: "0.75rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "50px",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      fontSize: "0.95rem",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s ease",
    },

    filterSection: {
      position: "relative",
      zIndex: 1,
      maxHeight: showFilters ? "500px" : "0",
      opacity: showFilters ? 1 : 0,
      overflow: "hidden",
      transition: "max-height 0.5s ease, opacity 0.5s ease",
      marginBottom: showFilters ? "2rem" : "0",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.85)"
        : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: showFilters ? "2rem" : "0 2rem",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"
      }`,
      boxShadow: isDarkMode
        ? "0 20px 60px rgba(0,0,0,0.8)"
        : "0 20px 60px rgba(62,39,35,0.08)",
    },
    filterGrid: {
      display: "grid",
      gridTemplateColumns: windowWidth <= 768 ? "1fr" : "repeat(3, 1fr)",
      gap: "1.5rem",
    },
    filterLabel: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : "#3e2723",
    },
    filterSelectInline: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#fcf8f5",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "12px",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.3s ease",
    },
    priceInput: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#fcf8f5",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "12px",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      fontSize: "0.95rem",
      outline: "none",
    },

    activeFilters: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      alignItems: "center",
      marginBottom: "2rem",
    },
    filterChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1.25rem",
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "50px",
      fontSize: "0.9rem",
      color: isDarkMode ? "#ffffff" : "#3e2723",
      fontWeight: "500",
    },
    clearChip: {
      cursor: "pointer",
      color: "#f5346b",
      fontSize: "1rem",
      transition: "transform 0.3s",
    },
    clearAllButton: {
      background: "none",
      border: "none",
      color: "#f5346b",
      fontSize: "0.9rem",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "underline",
      marginLeft: "0.5rem",
    },

    productsGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns:
        windowWidth <= 480
          ? "1fr"
          : windowWidth <= 768
          ? "repeat(2, 1fr)"
          : windowWidth <= 1024
          ? "repeat(3, 1fr)"
          : "repeat(4, 1fr)",
      gap: "1.5rem",
      marginBottom: "2rem",
      alignItems: "stretch",
    },

    noResults: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: "4rem 2rem",
      background: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
    },
    noResultsIcon: {
      fontSize: "4rem",
      color: "#f5346b",
      marginBottom: "1rem",
    },

    pagination: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.85)"
        : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      padding: "1rem 1.5rem",
      borderRadius: "50px",
      width: "fit-content",
      margin: "2rem auto 0",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    },
    pageButton: {
      minWidth: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      color: isDarkMode ? "#a0a0a0" : "#6d4c41",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
    },
    activePage: {
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? "#0f0f0f" : "#ffffff",
      fontWeight: "800",
      boxShadow: "0 4px 15px rgba(245,52,107,0.4)",
    },
    pageDots: { color: isDarkMode ? "#a0a0a0" : "#6d4c41" },
  };

  if (!query) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.bgBlob1}></div>
        <div style={themeStyles.bgBlob2}></div>
        <SEO
          title="Search Natural Skincare | ASudha Beauty"
          description="Search for natural skincare, herbal powders, and Ayurvedic beauty products."
        />

        <div style={themeStyles.noResults}>
          <FaLeaf style={themeStyles.noResultsIcon} />
          <h2>Discover Natural Skincare</h2>
          <p style={{ color: isDarkMode ? "#a0a0a0" : "#6d4c41" }}>
            Search for Multani Mitti, Ubtan, Shikakai, and more herbal products
          </p>

          {/* Popular keyword chips when no query */}
          <div
            style={{
              ...themeStyles.suggestionChips,
              justifyContent: "center",
              marginTop: "1.5rem",
            }}
          >
            {herbalKeywords.slice(0, 8).map((k) => (
              <Link
                key={k}
                to={`/search?q=${encodeURIComponent(k)}`}
                style={themeStyles.suggestionChip}
              >
                <FaLeaf style={{ fontSize: "0.75em" }} />
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.bgBlob1}></div>
      <div style={themeStyles.bgBlob2}></div>

      <SEO
        title={`Search results for "${query}" | ASudha Beauty`}
        description={`Found ${filteredResults.length} natural and herbal products matching "${query}".`}
      />

      <div style={themeStyles.header}>
        <div>
          <h1 style={themeStyles.title}>
            <FaSearch style={{ fontSize: "0.8em" }} /> Search Results
          </h1>
          <p style={themeStyles.resultsCount}>
            Found{" "}
            <span style={themeStyles.query}>{filteredResults.length}</span>{" "}
            natural product{filteredResults.length !== 1 ? "s" : ""} for "
            {query}"
          </p>
        </div>

        <div style={themeStyles.activeFiltersAndSort}>
          <button
            style={themeStyles.filterButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaSlidersH /> {showFilters ? "Hide Filters" : "Filters"}
          </button>
          <select
            style={themeStyles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Suggestions for the current query (only when we have some) */}
      {(suggestions.products.length > 0 ||
        suggestions.keywords.length > 0) && (
        <div style={themeStyles.suggestionsBox}>
          <div style={themeStyles.suggestionsTitle}>
            <FaInfoCircle /> Suggestions for "{query}"
          </div>
          <div style={themeStyles.suggestionChips}>
            {suggestions.products.map((s) => (
              <Link
                key={`p-${s.id}`}
                to={`/search?q=${encodeURIComponent(s.label)}`}
                style={themeStyles.suggestionChip}
              >
                <FaSearch style={{ fontSize: "0.75em" }} />
                {s.label}
              </Link>
            ))}
            {suggestions.keywords.map((k) => (
              <Link
                key={`k-${k.label}`}
                to={`/search?q=${encodeURIComponent(k.label)}`}
                style={themeStyles.suggestionChip}
              >
                <FaLeaf style={{ fontSize: "0.75em" }} />
                {k.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sliding Filters */}
      <div style={themeStyles.filterSection}>
        <div style={themeStyles.filterGrid}>
          <div>
            <label style={themeStyles.filterLabel}>Category</label>
            <select
              style={themeStyles.filterSelectInline}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={themeStyles.filterLabel}>Min Price (₹)</label>
            <input
              type="number"
              style={themeStyles.priceInput}
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: Number(e.target.value) })
              }
              min="0"
              max={priceRange.max}
            />
          </div>
          <div>
            <label style={themeStyles.filterLabel}>Max Price (₹)</label>
            <input
              type="number"
              style={themeStyles.priceInput}
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: Number(e.target.value) })
              }
              min={priceRange.min}
              max="1000"
            />
          </div>
        </div>
      </div>

      {/* Active Chips */}
      {(selectedCategory !== "all" ||
        priceRange.min > 0 ||
        priceRange.max < 1000) && (
        <div style={themeStyles.activeFilters}>
          {selectedCategory !== "all" && (
            <span style={themeStyles.filterChip}>
              Category: {selectedCategory}
              <span
                style={themeStyles.clearChip}
                onClick={() => setSelectedCategory("all")}
              >
                <FaTimes />
              </span>
            </span>
          )}
          {(priceRange.min > 0 || priceRange.max < 1000) && (
            <span style={themeStyles.filterChip}>
              Price: ₹{priceRange.min} - ₹{priceRange.max}
              <span
                style={themeStyles.clearChip}
                onClick={() => setPriceRange({ min: 0, max: 1000 })}
              >
                <FaTimes />
              </span>
            </span>
          )}
          <button style={themeStyles.clearAllButton} onClick={clearFilters}>
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredResults.length === 0 ? (
        <div style={themeStyles.noResults}>
          <FaInfoCircle style={themeStyles.noResultsIcon} />
          <h2>No natural products found</h2>
          <p style={{ color: isDarkMode ? "#a0a0a0" : "#6d4c41" }}>
            Try searching for Multani Mitti, Ubtan, or other herbal products
          </p>
          <div
            style={{
              ...themeStyles.suggestionChips,
              justifyContent: "center",
              marginTop: "1.5rem",
            }}
          >
            {herbalKeywords.slice(0, 8).map((k) => (
              <Link
                key={k}
                to={`/search?q=${encodeURIComponent(k)}`}
                style={themeStyles.suggestionChip}
              >
                <FaLeaf style={{ fontSize: "0.75em" }} />
                {k}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div style={themeStyles.productsGrid}>
            {paginatedResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                showBadge={product.category === "Skincare"}
                badgeText={product.category === "Skincare" ? "🌿 Natural" : ""}
              />
            ))}
          </div>

          {/* Premium Floating Pagination */}
          {totalPages > 1 && (
            <div style={themeStyles.pagination}>
              <button
                style={themeStyles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      style={{
                        ...themeStyles.pageButton,
                        ...(currentPage === page ? themeStyles.activePage : {}),
                      }}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} style={themeStyles.pageDots}>
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                style={themeStyles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;