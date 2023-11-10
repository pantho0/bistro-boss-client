import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'

const Category = () => {
    return (
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={img1} alt="" />
            <h4 className='text-3xl text-center text-white -m-12'>Salads</h4>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img2} alt="" />
        <h4 className='text-3xl text-center text-white -m-12'>Pizzas</h4>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img3} alt="" />
        <h4 className='text-3xl text-center text-white -m-12'>Soups</h4>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img4} alt="" />
        <h4 className='text-3xl text-center text-white -m-12'>Dessert</h4>
        </SwiperSlide>
        <SwiperSlide>
        <img src={img5} alt="" />
        </SwiperSlide>
      </Swiper>
    );
};

export default Category;