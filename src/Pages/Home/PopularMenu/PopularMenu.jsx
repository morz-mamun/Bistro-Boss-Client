import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";


const PopularMenu = () => {
  const [menus] = useMenu()
  const popularMenu = menus.filter(menu => menu.category === 'popular')
  return (
      <section className="my-20">
        <SectionTitle subHeading={"Check it Out"} heading={"From Our Menu"}>
          {" "}
        </SectionTitle>

        <div className="grid md:grid-cols-2 gap-5">
            {
                popularMenu.map(menu =>  <MenuItem
                    key={menu._id}
                    menu={menu}>
                </MenuItem>
                   
                     )
            }
        </div>
      </section>
  );
};

export default PopularMenu;
