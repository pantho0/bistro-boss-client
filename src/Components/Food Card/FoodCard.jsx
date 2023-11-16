import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
  const { _id, image, name, price, recipe } = item;
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const handleAddtoCart = (food) => {
    if (user && user.email) {
      const cartItem = {
        menuID: _id,
        name,
        image,
        price,
      };
      axiosSecure.post('/carts', cartItem)
      .then(res=>{
        console.log(res.data);
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${name} added to your cart`,
                showConfirmButton: false,
                timer: 1500
              });
        }
      })
    } else {
      Swal.fire({
        title: "You are not Loggged IN",
        text: "Do you want to login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <p className="absolute right-0 mr-4 mt-12 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddtoCart(item)}
            className="btn btn-primary"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
