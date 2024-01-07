import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosSecure = useAxios();
  const [carts, refetch] = useCart();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate()

  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

 
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !element) {
      return;
    }

    const card = element.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      // console.log('payment error', error);
      setSuccess("");
    } else {
      setError("");
      console.log("Payment method", paymentMethod);
      setSuccess("Payment is successfully done.");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id:", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save payment data to server
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          cartId: carts.map((item) => item._id),
          menuId: carts.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payment", payment);
        refetch()
        console.log("payment save", res.data);
        navigate('/dashboard/paymentHistory')
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement>
          options=
          {{
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
        </CardElement>
        <button
          className="btn btn-sm btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-green-600 font-bold">{success}</p>
        <p className="text-red-600 font-bold">{error}</p>
        {transactionId && (
          <p>
            Your transaction Id :{" "}
            <span className="text-blue-600">{transactionId}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
