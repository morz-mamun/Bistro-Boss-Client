import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <section className='my-20'>
          <SectionTitle
          heading={'Online Order'}
          subHeading={'10.00 am to 11.00 pm'}
          >
          </SectionTitle>
          <Swiper
        slidesPerView={4}
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={img1} alt="" />
            <h3 className='text-2xl text-center uppercase -mt-16 font-bold'>Salad</h3>
        </SwiperSlide>
        
        <SwiperSlide>
        <img src={img2} alt="" />
        <h3 className='text-2xl text-center uppercase -mt-16 font-bold'>Pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img3} alt="" />
        <h3 className='text-2xl text-center uppercase -mt-16 font-bold'>Soup</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img4} alt="" />
        <h3 className='text-2xl text-center uppercase -mt-16 font-bold'>Deserts</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img5} alt="" />
        <h3 className='text-2xl text-center uppercase -mt-16 font-bold'>Salad</h3>
        </SwiperSlide>
      </Swiper>
        </section>
    );
};

export default Category;