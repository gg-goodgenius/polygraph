import { createContext, useState, useEffect } from "react";
import { ItemPersonProps } from "../components/AppItemPerson";
export const StateContext = createContext<any>(null);

export const State = ({ children }: any) => {
    const [currentPerson, setCurrentPerson] = useState<ItemPersonProps>();
    const [currentData, setCurrentData] = useState<any>()
    const [currentAllData, setCurrentAllData] = useState<any>()
    const [currentQuestion, setCurrentQuestion] = useState<any>()

    return (
        <StateContext.Provider
            value={{
                currentPerson,
                setCurrentPerson,
                currentData,
                setCurrentData,
                currentQuestion,
                setCurrentQuestion,
                currentAllData,
                setCurrentAllData
            }}
        >
            {children}
        </StateContext.Provider>
    );
}