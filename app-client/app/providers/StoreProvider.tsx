import { authStore } from "@client/entities/user/stores/AuthStore";
import { type ReactNode, createContext } from "react";

export const StoreContext = createContext({
	authStore,
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	return (
		<StoreContext.Provider value={{ authStore }}>
			{children}
		</StoreContext.Provider>
	);
};
