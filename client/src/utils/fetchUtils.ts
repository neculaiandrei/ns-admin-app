import { toast } from 'react-toastify';

export const safeFetch = (url: string, options?: RequestInit) => {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        toast.error("Error occured", {
          position: "bottom-right",
          autoClose: 1000,
        });

        throw "Error occured";
      }
    });
};