import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-image bg-fixed  text-white pt-8 my-20">
            <SectionTitle subHeading='Check it out' heading='Featured Item'></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36 ">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ab soluta commodi aliquid cum quasi eligendi dolores, doloremque labore quia rerum illum sint praesentium fugit animi. Quod tempora ad magnam rerum quibusdam temporibus eius dolor numquam consequuntur eaque minus, earum, perferendis dolore et reiciendis debitis beatae asperiores alias nesciunt laudantium?</p>
                    <button className="btn btn-outline btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;