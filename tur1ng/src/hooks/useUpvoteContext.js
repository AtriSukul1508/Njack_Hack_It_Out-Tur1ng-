import { UpvoteContext } from "../context/UpvoteContext";
import { useContext } from "react";

export const useUpvoteContext = () => {
    const context = useContext(UpvoteContext);
    if (!context) {
        throw Error("useUpvoteContext must be used inside an UPvoteContextProvider")
    }
    return context;
}