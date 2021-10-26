import { SideNav } from './SideNav/SideNav';
import { useResizeHeight } from '../hooks/useResizeHeight';
import { useWindowResize } from '../hooks/useWindowResize';
import {
  BrowserRouter} from "react-router-dom";
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { getDefaultStoreData, StoreData } from './Models';
import { Routes } from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.scss';
import { safeFetch } from '../utils/fetchUtils';

export const StoreContext = React.createContext<{
  data: StoreData,
  setData: (data: StoreData) => void
}>({
  data: getDefaultStoreData(),
  setData: () => {}
});

export const App = () => {
  const size = useWindowResize();
  const elRef = useResizeHeight();
  const [data, setData] = useState<StoreData>(getDefaultStoreData());

  useEffect(() => {
    safeFetch('/api/aggregate')
      .then(setData);
  }, []);
  
  return (
    <BrowserRouter>
      <div className="ns-layout">
        <AppHeader />
        <div className="body">
          {size && size.width > 768 && <SideNav />}
          <div ref={elRef} className="main">
            <StoreContext.Provider value={{data, setData}}>
              <Routes />
            </StoreContext.Provider>
          </div>
          {size && size.width <= 768 && <BottomNav />}
          <ToastContainer />
        </div>
      </div>
    </BrowserRouter>
  );
};
