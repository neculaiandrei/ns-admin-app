import { SideNav } from './SideNav/SideNav';
import { useResizeHeight } from '../hooks/useResizeHeight';
import { useWindowResize } from '../hooks/useWindowResize';
import {
  BrowserRouter} from "react-router-dom";
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { useEffect, useState } from 'react';
import React from 'react';
import { StoreData } from '../Models';
import { Routes } from './Routes';

const defaultData: StoreData = {
  groups: [],
  persons: [],
  links: []
};

export const StoreContext = React.createContext<{
  data: StoreData,
  setData: (data: StoreData) => void
}>({
  data: {...defaultData},
  setData: () => {}
});

export const App = () => {
  const size = useWindowResize();
  const elRef = useResizeHeight();
  const [data, setData] = useState<StoreData>({...defaultData});

  useEffect(() => {
    fetch('/api/data')
      .then(result => result.json())
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
        </div>
      </div>
    </BrowserRouter>
  );
};
