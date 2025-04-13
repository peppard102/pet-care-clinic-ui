import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// This hook will tell you if you are using a tablet screen size
const useIsTablet = () => {
	const theme = useTheme();
	const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up('sm'));
	const isSmallerThanDesktop = useMediaQuery(theme.breakpoints.down('md'));

	return isBiggerThanMobile && isSmallerThanDesktop;
};

export default useIsTablet;
