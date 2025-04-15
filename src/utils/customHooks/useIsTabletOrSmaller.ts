import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// This hook will tell you if you are using a screen size that is tablet sized or smaller.
const useIsTabletOrSmaller = (): boolean => {
	const theme = useTheme();
	const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

	return isTabletOrSmaller;
};

export default useIsTabletOrSmaller;
