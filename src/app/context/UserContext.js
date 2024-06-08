'use client'

import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({
    state: true,
    setReload: (state) => {},
})
export function UserProvider({children}) {
    const [state, setState] = useState(false);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("State", state)
        if (!accessToken) {
            setState(curr => false);
        }
        else{
            setState(curr => true)
        }
    }, [reload]);

    return (
        <UserContext.Provider value= {
            {state,
            setReload}
        }>
            {children}
        </UserContext.Provider>
    )
}