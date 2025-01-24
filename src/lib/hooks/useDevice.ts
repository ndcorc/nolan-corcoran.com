// src/lib/hooks/useDevice.ts
import { useMediaQuery } from '@mantine/hooks';

const useDevice = () => {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Mobile: 0 - 768px
  const isLaptop = useMediaQuery('(min-width: 769px) and (max-width: 992px)'); // Laptop: 769px - 992px
  const isDesktop = useMediaQuery('(min-width: 993px)'); // Desktop: 993px and above

  return { isMobile, isLaptop, isDesktop };
};

export default useDevice;