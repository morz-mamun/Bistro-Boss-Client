import { AiOutlineDelete } from "react-icons/ai";
import useCart from "../../../Hooks/useCart";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [carts, refetch] = useCart();
  const axiosSecure = useAxios();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly">
        <h1 className="text-2xl font-bold uppercase">
          Total Order: {carts.length}
        </h1>
        <h1 className="text-2xl font-bold uppercase">
          Total Price: {totalPrice}
        </h1>
        {carts.length ? (
          <Link to={"/dashboard/payment"}>
            {" "}
            <button className="btn btn-secondary btn-sm">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-secondary btn-sm">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-outline btn-sm text-lg"
                  >
                    <AiOutlineDelete className="text-red-600"></AiOutlineDelete>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
