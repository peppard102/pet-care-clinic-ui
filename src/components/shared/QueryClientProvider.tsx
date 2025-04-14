import {
	QueryClientProvider as ReactQueryProvider,
	QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import ServerStateProvider from './ServerStateProvider';

interface QueryClientProviderProps {
	children: ReactNode;
}

// This component sets up react-query
const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<ReactQueryProvider client={queryClient}>
			<ServerStateProvider>{children}</ServerStateProvider>
			<ReactQueryDevtools />
		</ReactQueryProvider>
	);
};

export default QueryClientProvider;
