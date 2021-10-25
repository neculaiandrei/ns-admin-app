import { Switch, Route } from "react-router-dom";
import { GroupAdd } from "./GroupAdd";
import { GroupEdit } from "./GroupEdit";
import { GroupInfo } from "./GroupInfo";
import { Groups } from "./Groups";
import { PersonAdd } from "./PersonAdd";
import { PersonEdit } from "./PersonEdit";
import { PersonInfo } from "./PersonInfo";
import { Persons } from "./Persons";
import { PersonsLink } from "./PersonsLink";

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Persons />
    </Route>
    <Route path="/persons/link/:groupId">
      <PersonsLink />
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
    <Route path="/groups/:groupParentId">
      <Groups />
    </Route>
    <Route path="/groups">
      <Groups />
    </Route>
    <Route path="/group/info/:id">
      <GroupInfo />
    </Route>
    <Route path="/group/add/:groupParentId">
      <GroupAdd />
    </Route>
    <Route path="/group/add">
      <GroupAdd />
    </Route>
    <Route path="/group/edit/:id">
      <GroupEdit />
    </Route>
  </Switch>
);