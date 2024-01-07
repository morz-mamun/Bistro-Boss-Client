import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AllUsers = () => {
  const axiosSecure = useAxios();

  // tanStack query code
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is Admin now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
        axiosSecure.delete(`/users/${id}`).then((res) => {
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
      <SectionTitle heading={"Manage All users"} subHeading={'How many??'} ></SectionTitle>
      <div className="py-5">
        {/* <h1 className="text-3xl font-bold uppercase">All Users</h1> */}
        <h1 className="text-3xl font-bold uppercase">
          Total Users: {users.length}
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-orange-500 text-xl text-white hover:bg-black"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
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
  );
};

export default AllUsers;
