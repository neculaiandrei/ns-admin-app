import { useEffect, useRef } from "react";

export const useResizeHeight = () => {
  const elRef = useRef(null);

  useEffect(() => {
    if (elRef && elRef.current) {
      const resizeFn = () => {
        if (elRef.current) {
          if (window.innerWidth > 768) {
            (elRef.current as unknown as HTMLElement).style.height = (window.innerHeight - 49) + 'px';;
          } else {
            (elRef.current as unknown as HTMLElement).style.height = (window.innerHeight - 49 - 49) + 'px';;
          }
        }
      };

      resizeFn();
      window.addEventListener('resize', resizeFn);

      return () => window.removeEventListener('resize', resizeFn);
    }
  }, [elRef]);

  return elRef;
};