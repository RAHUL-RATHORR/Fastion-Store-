import type { CartItem } from "@/context/CartContext";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export type PlacedOrder = {
  orderId: string;
  placedAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentLabel: string;
  customer: {
    email: string;
    phone: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  deliveryDate: string;
};

export type TrackingStep = {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string | null;
  completed: boolean;
  active: boolean;
};

const LAST_ORDER_KEY = "gilzod:last-order";
const ORDERS_KEY = "gilzod:orders";

const trackingMilestones: {
  status: OrderStatus;
  hours: number;
  title: string;
  description: string;
}[] = [
  { status: "placed", hours: 0, title: "Order Placed", description: "Your order has been received." },
  {
    status: "confirmed",
    hours: 0.05,
    title: "Order Confirmed",
    description: "Payment verified and order confirmed.",
  },
  { status: "packed", hours: 4, title: "Packed", description: "Your items have been packed at our warehouse." },
  {
    status: "shipped",
    hours: 24,
    title: "Shipped",
    description: "Package handed to courier partner.",
  },
  {
    status: "out_for_delivery",
    hours: 96,
    title: "Out for Delivery",
    description: "Delivery agent is on the way to your address.",
  },
  {
    status: "delivered",
    hours: 144,
    title: "Delivered",
    description: "Order delivered successfully.",
  },
];

export function generateOrderId() {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GZ${stamp}${random}`;
}

export function getDeliveryDate(daysFromNow = 6) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatStepTime(date: Date) {
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getOrderTracking(order: PlacedOrder) {
  const placed = new Date(order.placedAt);
  const hoursSince = (Date.now() - placed.getTime()) / (1000 * 60 * 60);

  const steps: TrackingStep[] = trackingMilestones.map((milestone) => {
    const completed = hoursSince >= milestone.hours;
    const stepDate = new Date(placed.getTime() + milestone.hours * 60 * 60 * 1000);

    return {
      status: milestone.status,
      title: milestone.title,
      description: milestone.description,
      timestamp: completed ? formatStepTime(stepDate) : null,
      completed,
      active: false,
    };
  });

  const activeIndex = steps.findIndex((step) => !step.completed);
  if (activeIndex === -1) {
    steps[steps.length - 1].active = true;
  } else {
    steps[activeIndex].active = true;
  }

  const progress = Math.round(
    (steps.filter((s) => s.completed).length / steps.length) * 100
  );

  const lastCompleted = [...steps].reverse().find((s) => s.completed);
  const currentStatus: OrderStatus = lastCompleted?.status ?? "placed";

  return { steps, currentStatus, progress, isDelivered: currentStatus === "delivered" };
}

function readOrders(): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PlacedOrder[];
  } catch {
    return [];
  }
}

export function getAllOrders(): PlacedOrder[] {
  return readOrders();
}

export function savePlacedOrder(order: PlacedOrder) {
  sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));

  const orders = readOrders().filter((o) => o.orderId !== order.orderId);
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 30)));
}

export function getPlacedOrder(): PlacedOrder | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(LAST_ORDER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}

export function getOrderById(orderId: string): PlacedOrder | null {
  const normalized = orderId.trim().toUpperCase();
  const last = getPlacedOrder();
  if (last?.orderId.toUpperCase() === normalized) return last;

  return readOrders().find((o) => o.orderId.toUpperCase() === normalized) ?? null;
}

export function findOrder(orderId: string, email?: string): PlacedOrder | null {
  const order = getOrderById(orderId);
  if (!order) return null;

  if (email?.trim()) {
    const match = order.customer.email.trim().toLowerCase() === email.trim().toLowerCase();
    if (!match) return null;
  }

  return order;
}

export function clearPlacedOrder() {
  sessionStorage.removeItem(LAST_ORDER_KEY);
}
