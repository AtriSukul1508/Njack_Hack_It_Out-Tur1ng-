import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const signup = async (name, email, phone, password, cpassword) => {
        setIsLoading(true);
        setError(null);
        const resp = await fetch('/userapi/signup', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password, cpassword })
        })
        const data = await resp.json();
        if (!resp.ok) {
            setIsLoading(false);
            setError(data.error);
        } else {
            // save the user to local storage
            localStorage.setItem('tur1ng_user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data })

            setIsLoading(false);
        }
    }
    return { signup, isLoading, error };
}