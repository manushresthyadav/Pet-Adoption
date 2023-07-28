import { createContext } from "react";
export const UserContext = createContext();
export const userContextProvider = ({children , value})=>{

    return(
<UserContext.Provider value={value}>
    {children}
</UserContext.Provider>
    )

}