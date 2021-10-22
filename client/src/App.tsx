import { Persons } from './components/Persons';
import { SideNav } from './components/SideNav/SideNav';
import { Person } from './Data';
import { useResizeHeight } from './hooks/useResizeHeight';
import { useWindowResize } from './hooks/useWindowResize';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import { PersonInfo } from './components/PersonInfo';
import { PersonAdd } from './components/PersonAdd';
import { PersonEdit } from './components/PersonEdit';
import { AppHeader } from './AppHeader';

interface AppProps {
  persons: Person[]
}

export const App = ({ persons }: AppProps) => {
  const size = useWindowResize();
  const elRef = useResizeHeight(49);

  return (
    <BrowserRouter>
      <div className="ns-layout">
        <AppHeader />
        <div className="body">
          {size && size.width > 768 && <SideNav />}
          <div ref={elRef} className="main">
            <Switch>
              <Route exact path="/">
                <Persons persons={persons} />
              </Route>
              <Route path="/persons">
                <Persons persons={persons} />
              </Route>
              <Route path="/groups">
                <div>GROUPS</div>
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
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
