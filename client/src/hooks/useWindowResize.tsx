import { useEffect, useState } from "react";

export interface WindowSize {
  height: number;
  width: number;
}

export const useWindowResize = () => {
  const [size, setSize] = useState<WindowSize>();

  useEffect(() => {
    const handleResizeFn = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };

    handleResizeFn();
    window.addEventListener('resize', handleResizeFn);

    return () => window.removeEventListener('resize', handleResizeFn);
  }, []);

  return size;
};