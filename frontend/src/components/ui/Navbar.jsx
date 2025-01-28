import React from "react";
import { NavLink, useNavigate } from "react-router";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import { Tooltip } from "antd";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { loginUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(loginUser);

  function handleLogout() {
    dispatch(updateUser(null));
    navigate("/login");
  }

  return (
    <nav className="border-b border-green-200 sticky top-0 bg-white">
      <section className="container mx-auto p-2 flex justify-between">
        <NavLink className="hover:text-green-500" to={"/"}>
          <h2 className="text-2xl font-bold text-green-500">F.M</h2>
        </NavLink>

        <div className="flex gap-4 items-center text-lg text-gray-500">
          <NavLink className="hover:text-green-500" to={"/marketplace"}>
            Farm Marker
          </NavLink>
          {loginUser === null ? (
            <NavLink className="text-green-800 hover:text-black" to={"/login"}>
              Login
            </NavLink>
          ) : (
            <div>
              <p>{loginUser.name}</p>
            </div>
          )}

          {loginUser !== null && loginUser.userType === "admin" ? (
            <NavLink
              className="border p-1 rounded-md text-red-500 border-red-600"
              to={"/admin"}
            >
              <Tooltip title="Admin dashboard">
                <User size={16} />
              </Tooltip>
            </NavLink>
          ) : (
            <NavLink className="hover:text-green-500 relative" to={"/cart"}>
              <ShoppingCart />
              <p className="bg-green-700 text-white text-xs rounded-full text-center py-1 font-bold absolute -right-3 -top-2 w-6 h-6">
                {cartItems.length}
              </p>
            </NavLink>
          )}

          {loginUser !== null && (
            <button
              onClick={handleLogout}
              className="border p-1 rounded-md text-red-500 border-red-600"
            >
              <Tooltip title="Logout">
                <LogOut size={16} />
              </Tooltip>
            </button>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
