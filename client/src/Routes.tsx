import { Switch, Route } from "react-router-dom";
import { GroupAdd } from "./components/GroupAdd";
import { GroupEdit } from "./components/GroupEdit";
import { GroupInfo } from "./components/GroupInfo";
import { Groups } from "./components/Groups";
import { PersonAdd } from "./components/PersonAdd";
import { PersonEdit } from "./components/PersonEdit";
import { PersonInfo } from "./components/PersonInfo";
import { Persons } from "./components/Persons";

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Persons />
    </Route>
    <Route path="/persons">
      <Persons />
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
    <Route path="/groups/:parentId">
      <Groups />
    </Route>
    <Route path="/groups">
      <Groups />
    </Route>
    <Route path="/group/info/:id">
      <GroupInfo />
    </Route>
    <Route path="/group/add">
      <GroupAdd />
    </Route>
    <Route path="/group/edit/:id">
      <GroupEdit />
    </Route>
  </Switch>
);