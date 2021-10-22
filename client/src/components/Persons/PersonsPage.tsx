import { PersonList } from "./PersonList";
import './PersonsPage.scss';
import { PersonsPageHeader } from "./PersonsPageHeader";

export const PersonsPage = () => (
  <div className="ns-persons-page">
      <PersonsPageHeader />
      <PersonList />
  </div>
);