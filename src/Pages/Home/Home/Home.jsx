
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import CallUs from '../CallUs/CallUs';
import ChefRecommends from '../ChefRecommends/ChefRecommends';
import Parallax from '../Parallax/Parallax';
import Testimonials from '../Testimonials/Testimonials';


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Category></Category>
           <PopularMenu></PopularMenu>
           <CallUs></CallUs>
           <ChefRecommends></ChefRecommends>
           <Parallax></Parallax>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;