import { StoreProvider } from "@client/app/providers/StoreProvider";
import AppRouter from "@client/app/router/AppRouter";
import { trpc } from "@client/shared/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

export function App() {
	const [queryClient] = useState(() => new QueryClient());

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000",
				}),
			],
		}),
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					<AppRouter />
				</StoreProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App;
