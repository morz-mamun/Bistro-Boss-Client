import React from "react";
import img from "../../../assets/home/slide1.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ChefRecommends = () => {
  return (
   <section className="my-20">
    <SectionTitle
    subHeading={'Should Try'}
    heading={'Chef Recommends'}
    ></SectionTitle>
    <div className="grid md:grid-cols-3 gap-5">
         <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Caeser Salad</h2>
        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        <div className="card-actions justify-center">
          <button className="btn btn-outline text-yellow-500">Add TO Cart</button>
        </div>
      </div>
    </div>
         <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Caeser Salad</h2>
        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        <div className="card-actions justify-center">
          <button className="btn btn-outline text-yellow-500">Add TO Cart</button>
        </div>
      </div>
    </div>
         <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Caeser Salad</h2>
        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        <div className="card-actions justify-center">
          <button className="btn btn-outline text-yellow-500">Add TO Cart</button>
        </div>
      </div>
    </div>
    </div>
   </section>
  );
};

export default ChefRecommends;
