import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import axios from "axios";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: payments = []} = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
           <SectionTitle heading={'Payment History'} subHeading={'Get your payment statement here'}></SectionTitle>
           <div>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>
            <div>

            </div>
           </div>
        </div>
    );
};

export default PaymentHistory;