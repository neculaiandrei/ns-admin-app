import { useContext } from "react";
import { StoreContext } from "../App";
import { PersonList } from "./PersonList";
import './PersonsPage.scss';
import { PersonsPageHeader } from "./PersonsPageHeader";

export const PersonsPage = () => {
  const { data } = useContext(StoreContext);

  return (
    <div className="ns-persons-page">
      <PersonsPageHeader />
      <PersonList persons={data.persons} />
    </div>
  );
};