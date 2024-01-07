import React from "react";
import Cover from "../Shared/Cover/Cover";
import menuBg from "../../assets/menu/menu-bg.jpg";
import dessertBg from "../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../assets/menu/pizza-bg.jpg";
import saladBg from "../../assets/menu/salad-bg.jpg";
import soupBg from "../../assets/menu/soup-bg.jpg";

import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useMenu from "../../Hooks/useMenu";
import MenuCategory from "./MenuCategory/MenuCategory";

const OurMenu = () => {
  const [menus] = useMenu();
  const offeredMenu = menus.filter((menu) => menu.category === "offered");
  const dessertMenu = menus.filter((menu) => menu.category === "dessert");
  const pizzaMenu = menus.filter((menu) => menu.category === "pizza");
  const saladMenu = menus.filter((menu) => menu.category === "salad");
  const soupMenu = menus.filter((menu) => menu.category === "soup");
  return (
    <div className="">
      <Cover
        img={menuBg}
        title={"OUR MENU"}
        description={"Would you like to try a dish?"}
      ></Cover>
      {/* Today's offered section */}
      <SectionTitle
        subHeading={"Don't Miss"}
        heading={"TODAY'S OFFER"}
      ></SectionTitle>

      <MenuCategory items={offeredMenu}></MenuCategory>

      {/* Desserts section */}
      <MenuCategory title={'desserts'} img={dessertBg} items={dessertMenu}></MenuCategory>

      {/* pizza section */}

      <MenuCategory items={pizzaMenu} title={'pizzas'} img={pizzaBg}></MenuCategory>

      {/* salad section */}
      
      <MenuCategory items={saladMenu} title={'salads'} img={saladBg}></MenuCategory>

      {/* soup section */}

      <MenuCategory items={soupMenu} title={'soups'} img={soupBg}></MenuCategory>
    </div>
  );
};

export default OurMenu;
