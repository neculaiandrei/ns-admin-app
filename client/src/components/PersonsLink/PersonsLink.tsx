import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { StoreContext } from "../App";
import { Person } from "../Models";
import { PersonList } from "./PersonList";
import './PersonsLink.scss';
import { PersonsLinkHeader } from "./PersonsLinkHeader";

export interface CheckedPerson extends Person {
  checked: boolean;
}

export const PersonsLink = () => {
  let { groupId } = useParams<{ groupId: string }>();
  const { data } = useContext(StoreContext);
  const [persons, setPersons] = useState<CheckedPerson[]>([]);

  useEffect(() => {
    const newPersons: CheckedPerson[] = data.persons.map(p => {
      const checked = data.links.some(l => l.groupId === +groupId && l.personId === p.id);
      return {...p, checked};
    });

    setPersons(newPersons);
  }, [data.persons, data.links, groupId]);

  return (
    <div className="ns-persons-page">
        <PersonsLinkHeader />
        <PersonList persons={persons} />
    </div>
  );
};