import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { bool } from 'prop-types';

const LoadingScreen = ({ isLoading }) => (
	<Backdrop
		sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
		open={isLoading}
	>
		<CircularProgress color="inherit" />
	</Backdrop>
);

LoadingScreen.propTypes = {
	isLoading: bool.isRequired,
};

export default LoadingScreen;
