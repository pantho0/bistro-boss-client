import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {signInWithGoogle} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogleLogin = () =>{
        signInWithGoogle()
        .then(res => {
            console.log(res.message);
            const userInfo = {
                name : res.user?.displayName,
                email : res.user?.email

            }
            axiosPublic.post("/users", userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/')
            })
        })
      }
    return (
        <>
             <div className="divider">OR</div>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-ghost"><FaGoogle></FaGoogle> Google</button>
        </>
    );
};

export default SocialLogin;