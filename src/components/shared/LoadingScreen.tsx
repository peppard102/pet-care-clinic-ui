import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingScreenProps {
	isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => (
	<Backdrop
		sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
		open={isLoading}
	>
		<CircularProgress color="inherit" />
	</Backdrop>
);

export default LoadingScreen;
