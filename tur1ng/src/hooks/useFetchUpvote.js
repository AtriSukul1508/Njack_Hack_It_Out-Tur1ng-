import { useState } from "react"
import apiConfig from "../api.config"
import { useUpvoteContext } from "./useUpvoteContext";
import { useAuthContext } from "./useAuthContext"
export const useFetchUpvote = () => {
    const [upvoteVal, setUpvoteVal] = useState(0);
    const [clicked, setClicked] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useUpvoteContext();
    const getUpvoteCount = async (id) => {
        const response = await fetch(apiConfig.URL + '/blogapi/upvote/' + id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        })
        const data = await response.json();
        if (response.ok) {
            setUpvoteVal(data.requiredBlog.upvoteCount);
            dispatch({ type: 'DISPLAY_UPVOTE', payload: data.requiredBlog })
            if (data.searchBlog.length) {
                setClicked(true);
            } else {
                setClicked(false);
            }
        }

    }
    return { getUpvoteCount, upvoteVal, clicked }
}