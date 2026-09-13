// src/context/OrdersContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const OrdersContext = createContext();

const STORAGE_KEY = "asudha_orders";

// Demo status progression: Processing → Shipped → Delivered
const STATUS_TIMELINE = [
  { status: "Processing", after: 0 },          // immediate
  { status: "Shipped", after: 15 * 1000 },      // after 15s
  { status: "Delivered", after: 45 * 1000 },    // after 45s
];

const getStatusForAge = (createdAt) => {
  const age = Date.now() - new Date(createdAt).getTime();
  let current = STATUS_TIMELINE[0].status;
  for (const step of STATUS_TIMELINE) {
    if (age >= step.after) current = step.status;
  }
  return current;
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [tick, setTick] = useState(0); // triggers re-eval of statuses

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setOrders(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  }, []);

  // Persist whenever orders change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error("Failed to save orders:", err);
    }
  }, [orders]);

  // Background tick to auto-progress statuses for demo
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Add a new order. Called from Checkout after payment succeeds.
   */
  const addOrder = useCallback((order) => {
    const now = new Date().toISOString();
    const newOrder = {
      id: order.id,
      date: order.date || now.split("T")[0],
      createdAt: order.createdAt || now,
      status: order.status || "Processing",
      subtotal: order.subtotal || 0,
      shipping: order.shipping || 0,
      discount: order.discount || 0,
      giftCardUsed: order.giftCardUsed || 0,
      total: order.total || 0,
      items: order.items || [],
      customer: order.customer || null,
      paymentMethod: order.paymentMethod || "card",
      trackingNumber:
        order.trackingNumber ||
        "ASU-TRK-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      estimatedDelivery: order.estimatedDelivery || null,
      history: [
        { date: now, status: "Order Placed", location: "Online" },
      ],
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  /**
   * Clear all orders (optional — for testing).
   */
  const clearOrders = useCallback(() => {
    setOrders([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear orders:", err);
    }
  }, []);

  /**
   * Filter by user email. Orders with no customer (legacy) are shown to all.
   */
  const getOrdersByUser = useCallback(
    (email) => {
      if (!email) return orders;
      const lower = email.toLowerCase();
      return orders.filter(
        (o) =>
          !o.customer?.email ||
          o.customer.email.toLowerCase() === lower
      );
    },
    [orders]
  );

  /**
   * Find a single order by ID + email (for TrackOrder).
   */
  const findOrder = useCallback(
    (orderId, email) => {
      if (!orderId) return null;
      const lowerEmail = (email || "").toLowerCase();
      return (
        orders.find(
          (o) =>
            o.id.toLowerCase() === orderId.trim().toLowerCase() &&
            (!lowerEmail ||
              !o.customer?.email ||
              o.customer.email.toLowerCase() === lowerEmail)
        ) || null
      );
    },
    [orders]
  );

  /**
   * Returns a live-computed status (overrides stored status after time passes).
   */
  const getLiveStatus = useCallback((order) => {
    if (!order) return "Processing";
    // If already delivered, leave it
    if (order.status === "Delivered") return "Delivered";
    return getStatusForAge(order.createdAt || order.date);
  }, []);

  const value = {
    orders,
    addOrder,
    clearOrders,
    getOrdersByUser,
    findOrder,
    getLiveStatus,
    _tick: tick, // internal — triggers re-render
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export default OrdersContext;