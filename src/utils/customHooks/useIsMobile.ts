import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// This hook will tell you if you are using a mobile screen size
const useIsMobile = (): boolean => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return isMobile;
};

export default useIsMobile;
