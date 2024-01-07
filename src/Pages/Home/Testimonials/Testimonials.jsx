import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

// react swiper style 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// react ratting
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        subHeading={"What Our Client Say"}
        heading={"Testimonials"}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>

           <div className="flex flex-col items-center mx-24 my-16 space-y-5">
           <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
            <p>{review.details}</p>
            <h1 className="text-orange-500 text-3xl">{review.name}</h1>
           </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
