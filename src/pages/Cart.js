import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  // Inside the Cart component
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <FaShoppingCart style={styles.emptyIcon} />
        <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
        <p style={styles.emptyText}>
          Looks like you haven't added any items yet.
        </p>
        <Link to="/shop" style={styles.shopButton}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      <div style={styles.cartGrid}>
        {/* Cart Items */}
        <div style={styles.cartItems}>
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.selectedShade}`}
              style={styles.cartItem}
            >
              <img src={item.image} alt={item.name} style={styles.itemImage} />

              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                {item.selectedShade && (
                  <p style={styles.itemShade}>Shade: {item.selectedShade}</p>
                )}
                <p style={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
              </div>

              <div style={styles.itemActions}>
                <div style={styles.quantityControl}>
                  <button
                    style={styles.quantityButton}
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedShade,
                        item.quantity - 1,
                      )
                    }
                  >
                    -
                  </button>
                  <span style={styles.quantityValue}>{item.quantity}</span>
                  <button
                    style={styles.quantityButton}
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedShade,
                        item.quantity + 1,
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item.id, item.selectedShade)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>

          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>

          <button
            style={styles.checkoutButton}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <Link to="/shop" style={styles.continueLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#333",
  },
  emptyCart: {
    textAlign: "center",
    padding: "4rem 1rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  emptyIcon: {
    fontSize: "4rem",
    color: "#ddd",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "1rem",
  },
  emptyText: {
    color: "#666",
    marginBottom: "2rem",
  },
  shopButton: {
    display: "inline-block",
    padding: "0.75rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  cartGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  cartItem: {
    display: "grid",
    gridTemplateColumns: "100px 1fr auto",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  itemImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  itemName: {
    fontSize: "1.1rem",
    marginBottom: "0.25rem",
    color: "#333",
  },
  itemShade: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "0.25rem",
  },
  itemPrice: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  itemActions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  quantityButton: {
    width: "30px",
    height: "30px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  quantityValue: {
    minWidth: "30px",
    textAlign: "center",
  },
  removeButton: {
    padding: "0.5rem",
    border: "none",
    backgroundColor: "transparent",
    color: "#ff4444",
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "color 0.3s",
  },
  summary: {
    padding: "1.5rem",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    height: "fit-content",
  },
  summaryTitle: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    color: "#666",
  },
  totalRow: {
    borderTop: "1px solid #ddd",
    marginTop: "0.5rem",
    paddingTop: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.1rem",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.3s",
  },
  continueLink: {
    display: "block",
    textAlign: "center",
    marginTop: "1rem",
    color: "#666",
    textDecoration: "none",
  },
};

// Responsive styles
const mediaQuery768 = window.matchMedia("(max-width: 768px)");
if (mediaQuery768.matches) {
  styles.cartGrid.gridTemplateColumns = "1fr";
  styles.cartItem.gridTemplateColumns = "80px 1fr";
  styles.cartItem.gridTemplateRows = "auto auto";
  styles.cartItem.gap = "1rem";
  styles.itemImage.width = "80px";
  styles.itemImage.height = "80px";
  styles.itemActions.gridColumn = "span 2";
  styles.itemActions.justifyContent = "space-between";
}

export default Cart;
