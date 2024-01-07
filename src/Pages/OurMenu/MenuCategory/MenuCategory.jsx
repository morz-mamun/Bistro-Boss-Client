import React from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";

const MenuCategory = ({ items, title, img}) => {
  return (
    <section className="my-20 space-y-10">
      {title && <Cover img={img} title={title} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></Cover>}
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((menu) => (
          <MenuItem key={menu._id} menu={menu}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-16">
        <Link to={`/ourOrder/${title}`}>
          <button className="btn btn-outline border-0 border-b-4">
            ORDER YOUR FAVOURITE FOOD
          </button>
        </Link>
      </div>
    </section>
  );
};

export default MenuCategory;
