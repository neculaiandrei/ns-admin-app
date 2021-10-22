import { Persons } from './components/Persons';
import { SideNav } from './components/SideNav';
import { Person } from './Data';
import { useResizeHeight } from './hooks/useResizeHeight';
import { useWindowResize } from './hooks/useWindowResize';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";

interface AppProps {
  persons: Person[]
}

export const App = ({ persons }: AppProps) => {
  const size = useWindowResize();
  const elRef = useResizeHeight(49);

  return (
    <BrowserRouter>
      <div className="ns-layout">
        <div className="header">
          Admin App
        </div>
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
                <div>DATE CAMI BAG PULA</div>
              </Route>
              <Route path="/person/details/:id">
                <div>INFO</div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
