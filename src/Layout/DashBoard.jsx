import { FaAddressCard, FaHome, FaList, FaPaypal, FaReceipt, FaShoppingBag, FaShoppingCart, FaStore, FaStreetView, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useCart from "../Hooks/useCart";

const DashBoard = () => {
  const [isAdmin] = useAdmin()
  const [carts] = useCart()
  return (
    <div className="flex">
      <div className="w-72 min-h-screen bg-orange-300 text-center py-5">
        <h1 className="uppercase">
          <span className="text-xl font-bold">Bistro Boss</span> <br />{" "}
          Restaurant
        </h1>
        <ul className="menu p-4 text-base">
          {
            isAdmin ? <>
            <li className="uppercase">
            <NavLink to={"/dashboard/adminHome"}>
              <FaHome></FaHome>
              Admin Home
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/addItem"}>
                <FaUtensils></FaUtensils>
              Add Items
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/manageItem"}>
                <FaPaypal></FaPaypal>
              manage Items
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/bookings"}>
            <FaStore></FaStore>
              Manage Bookings
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/users"}>
              <FaUsers></FaUsers>
              ALL users
            </NavLink>
          </li>
            </>
            : 
            <>
            <li className="uppercase">
            <NavLink to={"/dashboard/userHome"}>
              <FaHome></FaHome>
              User Home
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/reservation"}>
                <FaReceipt></FaReceipt>
              Reservation
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/paymentHistory"}>
                <FaPaypal></FaPaypal>
              Payment History
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/myCart"}>
              <FaShoppingCart></FaShoppingCart>
              My Cart ({carts.length}) 
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/review"}>
              <FaStreetView></FaStreetView>
              Add Review
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/dashboard/myBooking"}>
              <FaStore></FaStore>
              My Booking
            </NavLink>
          </li>
            </>
          }
          <div className="divider"></div>
          <li className="uppercase">
            <NavLink to={"/"}>
              <FaHome></FaHome>
            Home
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/ourOrder/salads"}>
              <FaList></FaList>
            Menu
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/"}>
              <FaShoppingBag></FaShoppingBag>
            Shop
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink to={"/ourOrder/contact"}>
              <FaAddressCard></FaAddressCard>
            Contact
            </NavLink>
          </li>
        </ul>
        
      </div>
      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
