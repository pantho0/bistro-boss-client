import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useCart from "../../Components/Hooks/useCart";
import useAuth from "../../Components/Hooks/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const price = cart.reduce((prevVal, item)=> prevVal+item.price, 0)

  useEffect(()=>{
    axiosSecure.post("/create-payment-intent",{price})
    .then(res => {
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement)
    if(card == null){
        return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type : 'card',
        card
    })

    if(error){
        console.log('Payment error message', error);
        setError(error.message)
    }
    else{
        console.log('Paymnet method disply', paymentMethod);
        setError('')
    }

    // Confirm Payment : 
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method :{
        card : card,
        billing_details : {
            email : user?.email || "anonymous",
            name : user?.displayName || "anonymous"
        }
      }
    })

    if(confirmError){
      console.log(confirmError);
    }
    else{
      console.log('payment success intent',paymentIntent);
      if(paymentIntent.status === "succeeded"){
        setTransactionId(paymentIntent.id)
        const payment = {
          email : user.email,
          price : price,
          transactionId : paymentIntent.id,
          date : new Date(), //use moment js for utc time
          cartIds: cart.map(item => item._id),
          menuItemIds : cart.map(item => item.menuID),
          status : "Pending"

        }
        const res = await axiosSecure.post("/payments", payment)
        console.log('payment saved',res.data);
      }
      
        
        
    }
    

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-primary my-6" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p>Your Transaction Id :{transactionId.id}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
