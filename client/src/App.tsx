import { Persons } from './components/Persons';
import { SideNav } from './components/SideNav/SideNav';
import { useResizeHeight } from './hooks/useResizeHeight';
import { useWindowResize } from './hooks/useWindowResize';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import { PersonInfo } from './components/PersonInfo';
import { PersonAdd } from './components/PersonAdd';
import { PersonEdit } from './components/PersonEdit';
import { AppHeader } from './AppHeader';
import { BottomNav } from './components/BottomNav';
import { Groups } from './components/Groups';
import { useEffect, useState } from 'react';
import React from 'react';
import { StoreData } from './Models';

const defaultData: StoreData = {
  groups: [],
  persons: [],
  links: []
};

export const StoreContext = React.createContext({...defaultData});

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
            <StoreContext.Provider value={data}>
              <Switch>
                <Route exact path="/">
                  <Persons />
                </Route>
                <Route path="/persons">
                  <Persons />
                </Route>
                <Route path="/groups">
                  <Groups />
                </Route>
                <Route path="/person/info/:id">
                  <PersonInfo />
                </Route>
                <Route path="/person/add">
                  <PersonAdd />
                </Route>
                <Route path="/person/edit/:id">
                  <PersonEdit />
                </Route>
              </Switch>
            </StoreContext.Provider>
          </div>
          {size && size.width <= 768 && <BottomNav />}
        </div>
      </div>
    </BrowserRouter>
  );
};
