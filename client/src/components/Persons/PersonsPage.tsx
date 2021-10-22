import { PersonList } from "./PersonList";
import './PersonsPage.scss';
import { PersonsPageHeader } from "./PersonsPageHeader";

export const PersonsPage = ({persons}: any) => (
  <div className="ns-persons-page">
      <PersonsPageHeader />
      <PersonList persons={persons} />
  </div>
);