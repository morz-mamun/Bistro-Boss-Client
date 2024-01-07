import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: payments } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payment/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-5xl"> Total Payment: {payments?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Transaction Id</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.email}</td>
                <td>{item.transactionId}</td>
                <td>${item.price}</td>
                <th>{item.date}</th>
                <th>{item.status}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
