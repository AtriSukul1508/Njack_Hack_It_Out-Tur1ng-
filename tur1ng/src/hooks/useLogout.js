import { useAuthContext } from "./useAuthContext";
import { useBlogsContext } from "./useBlogsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: blogDispatch } = useBlogsContext();
    const logout = () => {
        localStorage.removeItem('tur1ng_user');
        dispatch({ type: 'LOGOUT' });
        blogDispatch({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout };
}