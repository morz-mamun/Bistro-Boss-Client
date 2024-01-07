import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    // add publishable key
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY)
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Pay First'}> </SectionTitle>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;