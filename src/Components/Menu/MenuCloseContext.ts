import React, {useContext} from "react";

const MenuCloseContext = React.createContext<() => void>(() => {});

export const MenuCloseContextProvider = MenuCloseContext.Provider;

export function useMenuClose() {
    return useContext(MenuCloseContext);
}
