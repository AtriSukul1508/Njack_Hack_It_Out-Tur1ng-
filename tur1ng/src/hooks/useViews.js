import { useState } from "react"
import apiConfig from "../api.config"
import { useAuthContext } from "./useAuthContext"
export const useViews = () => {
    const [totalViewValue, setTotalView] = useState(0);
    const { user } = useAuthContext();
    const totalViews = async (id) => {
        const response = await fetch(apiConfig.URL + '/blogapi/views/' + id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({  })
        })
        const data = await response.json();
        setTotalView(data.totalViews);
    }
    return { totalViews, totalViewValue }

}
