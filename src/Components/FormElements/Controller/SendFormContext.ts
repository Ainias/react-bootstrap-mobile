import { createContext, useContext } from "react";

export const SendFormContext = createContext<(() => void)|undefined>(undefined);

export function useSendFormContext(){
    return useContext(SendFormContext);
}
