import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";


const FoodCard = ({item}) => {
    const {image, name, price, recipe} = item;
    const {user} = useAuth();
    const navigate = useNavigate()
    const handleAddtoCart = food =>{
        if(user && user.email){
            // todo: post it to server
        }else{
            Swal.fire({
                title: "You are not Loggged IN",
                text: "Do you want to login?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
              });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <p className="absolute right-0 mr-4 mt-12 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={()=>handleAddtoCart(item)} className="btn btn-primary">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;