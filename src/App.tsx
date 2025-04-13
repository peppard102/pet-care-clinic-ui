import { Routes, Route } from 'react-router-dom';
import ServerStateProvider from './components/shared/ServerStateProvider';
import NavBar from './components/shared/NavBar';
import { routes } from './routes';

function App() {
  return (
		<ServerStateProvider>
			<NavBar />
			<Routes>
				{routes.map(route => (
					<Route key={route.href} path={route.href} element={route.component} />
				))}
			</Routes>
		</ServerStateProvider>
	);
}

export default App
