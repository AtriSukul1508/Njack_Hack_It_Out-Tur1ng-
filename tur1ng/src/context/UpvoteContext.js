import { createContext, useReducer } from "react";

export const UpvoteContext = createContext();

export const upvoteReducer = (state, action) => {
    console.log('as',action,state,action.payload.upvoteCount);
    switch (action.type) {
        case 'DISPLAY_UPVOTE':
            return { upvote: action.payload.upvoteCount }
        case 'INCREMENT':
            return { upvote: action.payload.upvoteCount + 1 }

        case 'DECREMENT':
            return { upvote: action.payload.upvoteCount - 1 }

        default:
            return state;
    }
}


export const UpvoteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(upvoteReducer, {
        upvote: 0
    })
    // console.log('Upvote context ', state);
    return (
        <UpvoteContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UpvoteContext.Provider>
    )
}
