// src/lib/hooks/useDevice.ts
import { useMediaQuery } from '@mantine/hooks';
import { breakpoints } from '@/theme';

const useDevice = () => {
  // Collapsed nav (hamburger) layout — wide enough for the 3-column header
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.lg})`);
  const isLaptop = useMediaQuery(
    `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg})`
  );
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg})`);

  return { isMobile, isLaptop, isDesktop };
};

export default useDevice;