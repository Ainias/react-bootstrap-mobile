import React, {useContext} from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const MenuCloseContext = React.createContext<() => void>(() => {});

export const MenuCloseContextProvider = MenuCloseContext.Provider;

export function useMenuClose() {
    return useContext(MenuCloseContext);
}
