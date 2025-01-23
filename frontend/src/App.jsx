import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MarketPlace from "./pages/MarketPlace";
import MainLayout from "./layout/MainLayout";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Admin from "./pages/protected/Admin";
import OrderDetails from "./pages/protected/OrderDetails";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="marketplace">
          {/* index here means the first page to be directed to */}
          <Route index element={<MarketPlace />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="admin">
          <Route index element={<Admin />} />
          <Route path=":orderId" element={<OrderDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
