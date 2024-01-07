import React from "react";
import img from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Parallax = () => {
  return (
   
     <div
      className="my-20 pb-20 pt-10 px-20 gap-10 bg-fixed text-white"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      
      <SectionTitle
        subHeading={"Should Try"}
        heading={"Form Our Menu"}
      ></SectionTitle>

      <div className="flex items-center justify-center gap-10"> 
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <p> March 20, 2023</p>
          <h1>WHERE CAN I GET SOME?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline border-0 border-b-4 border-white text-yellow-500">Order Now</button>
        </div>
      </div>
    </div>
  )
};

export default Parallax;
