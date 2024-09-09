import { authStore } from "@user/stores/AuthStore";
import React, { createContext } from "react";

export const StoreContext = createContext({
	authStore,
});

export const StoreProvider = ({ children }) => {
	return (
		<StoreContext.Provider value={{ authStore }}>
			{children}
		</StoreContext.Provider>
	);
};
