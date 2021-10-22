import { useEffect, useRef } from "react";

export const useResizeHeight = (offset: number) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (elRef && elRef.current) {
      const resizeFn = () => {
        if (elRef.current) {
          (elRef.current as unknown as HTMLElement).style.height = (window.innerHeight - offset) + 'px';;
        }
      };

      resizeFn();
      window.addEventListener('resize', resizeFn);

      return () => window.removeEventListener('resize', resizeFn);
    }
  }, [elRef, offset]);

  return elRef;
};