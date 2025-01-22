export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

// First link from render.com
const BACKEND_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://agro-store.onrender.com/api/v1"
    : "http://localhost:3000/api/v1";

export { BACKEND_BASE_URL };
