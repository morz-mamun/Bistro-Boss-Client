import React from "react";
import FoodCard from "../../Shared/FoodCard/FoodCard";

const OrderTab = ({items}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {
      items.map((menu) => (
        <FoodCard key={menu._id} menu={menu}></FoodCard>
      ))
      }
    </div>
  );
};

export default OrderTab;
