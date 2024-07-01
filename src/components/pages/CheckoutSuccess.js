import { useSearchParams } from "react-router-dom";
import Header from "./partials/Header";

const CheckoutSuccess = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    let session_id = searchParams.get("session_id")
    console.log(searchParams.get("session_id"))

    return (
        <div>
            <Header />
            <h1 className="mt-5 mb-5" style={{ color: 'green', textAlign: 'center' }}>Your Transaction was Successful!</h1>


        </div>
    )
}

export default CheckoutSuccess