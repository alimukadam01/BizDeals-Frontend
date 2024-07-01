import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const navigate = useNavigate();

    //const [name, setname] = useState(auth.user)

    /* useEffect(() => {
        const logged = localStorage.getItem("user");
        if (logged) {
            setname(logged);
            console.log(logged);
        }
    }, []) */

    const [name, setname] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("user_name");
        const initialValue = JSON.parse(saved);
        return saved || auth.user;
    });



    if (!name) {
        navigate('/login')
    }

    return children;
}

export default RequireAuth;