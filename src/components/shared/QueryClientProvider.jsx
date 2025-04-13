import {
	QueryClientProvider as ReactQueryProvider,
	QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { element, oneOfType, arrayOf } from 'prop-types';
import ServerStateProvider from './ServerStateProvider';

// This component sets up react-query
const QueryClientProvider = ({ children }) => {
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

QueryClientProvider.propTypes = {
	children: oneOfType([element, arrayOf(element)]),
};

export default QueryClientProvider;
