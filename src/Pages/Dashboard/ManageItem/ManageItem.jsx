import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItem = () => {
  const [menus, refetch] = useMenu();
  const axiosSecure = useAxios();

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/menus/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch()
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
      <SectionTitle
        heading={"MANAGE ALL ITEMS"}
        subHeading={"Hurry Up"}
      ></SectionTitle>
      <h1 className="text-2xl font-bold">Total Users: {menus.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-black text-lg uppercase">#</th>
                <th className="text-black text-lg uppercase">Item Image</th>
                <th className="text-black text-lg uppercase">Item Name</th>
                <th className="text-black text-lg uppercase">Price</th>
                <th className="text-black text-lg uppercase">Update</th>
                <th className="text-black text-lg uppercase">Delete</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((item, index) => (
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
                  <td className="text-right">${item.price}</td>
                  <td>
                   <Link to={`/dashboard/updateItem/${item._id}`}>
                   <button className="btn bg-orange-500 text-xl text-white hover:bg-black">
                      <FaEdit></FaEdit>
                    </button>
                   </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn text-xl bg-red-600 text-white hover:bg-black"
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItem;
