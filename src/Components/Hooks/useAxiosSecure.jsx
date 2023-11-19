import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5001'
})
const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()
    // Intercepts when request happens
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interseptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error){
        return Promise.reject(error)
    }
    )

    // intercept when 401 & 403 happens
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async(error)=>{
        const status = error.response.status;
        console.log('status error in the interceptors', status);
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    }
    )

    return axiosSecure;
};

export default useAxiosSecure;