import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";


const FoodCard = ({ menu }) => {
  const { name, recipe, image, price, _id } = menu;
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth();
  const axiosSecure = useAxios()
  const [, refetch] = useCart()

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'blue',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

// add food item to database
  const handleAddCart = () => {
    if (user && user?.email) {
      const cartItem = {
        menuId : _id,
        email: user.email,
        name, 
        image,
        price
      }
     
      //send cart item to database
      axiosSecure.post('/carts', cartItem)
     .then(res => {
      if(res.data.acknowledged){
        Toast.fire({
          icon: 'success',
          title: `${name} successfully added to cart.`,
      })
      refetch()
      }
     })
    } else {
      Swal.fire({
        title: "You have to log in first",
        text: "You won't be able to add food to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state: {from: location}});
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={image} alt="Menu Image" />
      </figure>
      <p className="bg-black w-fit text-white absolute right-5 top-5 py-3 px-5 rounded-lg">
        ${price}
      </p>
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={handleAddCart}
            className="btn btn-outline border-0 border-b-2 text-yellow-500"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
