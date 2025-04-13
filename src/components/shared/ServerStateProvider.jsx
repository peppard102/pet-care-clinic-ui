import LoadingScreen from './LoadingScreen';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ServerErrorPage from './ErrorPages/ServerErrorPage';
import { element, oneOfType, arrayOf } from 'prop-types';
import { useLocation } from 'react-router-dom';

// This component handles the loading screen and the error page that shows
// up when an API call fails.
const ServerStateProvider = ({ children }) => {
	const location = useLocation();

	return (
		<Suspense fallback={<LoadingScreen isLoading />}>
			<QueryErrorResetBoundary>
				<ErrorBoundary
					// Setting the key to the route we're on will cause the error
					// boundary to be reset when we go to another page.
					key={location.pathname}
					FallbackComponent={ServerErrorPage}
				>
					{children}
				</ErrorBoundary>
			</QueryErrorResetBoundary>
		</Suspense>
	);
};

ServerStateProvider.propTypes = {
	children: oneOfType([element, arrayOf(element)]),
};

export default ServerStateProvider;
