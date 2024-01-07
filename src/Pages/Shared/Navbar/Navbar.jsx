import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../firebase/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const [carts] = useCart();

  const handleLogout = () => {
    logOut().then(() => {
      alert("User Logout Successfully.");
    });
  };
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/ourMenu"}>Our Menu</NavLink>
      </li>
      <li>
        <NavLink>Contact Us</NavLink>
      </li>
      <li>
        <NavLink to={"/ourOrder/salads"}>Our Orders</NavLink>
      </li>
      {user && !isAdmin && (
        <li>
          <NavLink to={"/dashboard/userHome"}>DashBoard</NavLink>
        </li>
      )}

      {user && isAdmin && (
        <li>
          <NavLink to={"/dashboard/adminHome"}>DashBoard</NavLink>
        </li>
      )}
      
      <li>
        <NavLink to={"/dashboard/myCart"}>
          <>
            <FaCartPlus></FaCartPlus>
            <div className="badge badge-secondary">+{carts.length}</div>
          </>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/registration"}>Registration</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar fixed z-10 text-white bg-black bg-opacity-25 max-w-screen-xl font-bold">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl uppercase">Bistro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm text-red-600 border-white font-bold"
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="btn btn-outline btn-sm text-red-600 border-white font-bold">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
