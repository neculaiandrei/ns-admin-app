import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { replaceItemInArrayBy } from "../../utils/arrayUtils";
import { safeFetch } from "../../utils/fetchUtils";
import { StoreContext } from "../App";
import { Person } from "../Models";
import { PersonList } from "./PersonList";
import './PersonsLink.scss';
import { PersonsLinkHeader } from "./PersonsLinkHeader";

export interface LinkedPerson extends Person {
  linked: boolean;
}

const useGroupIdParam = () => {
  let { groupId } = useParams<{ groupId: string }>();

  return +groupId;
};

export const PersonsLink = () => {
  const groupId = useGroupIdParam();
  const history = useHistory();
  const { data, setData } = useContext(StoreContext);
  const [persons, setPersons] = useState<LinkedPerson[]>([]);

  useEffect(() => {
    const newPersons: LinkedPerson[] = data.persons.map(p => {
      const linked = data.links.some(l => l.groupId === groupId && l.personId === p.id);
      return {...p, linked};
    });

    setPersons(newPersons);
  }, [data.persons, data.links, groupId]);

  const onCheck = (id: number) => {
    let updatedPerson = persons.find(p => p.id === id);

    if (updatedPerson) {
      updatedPerson = { ...updatedPerson, linked: !updatedPerson.linked };
      setPersons(replaceItemInArrayBy(persons, 'id', id, updatedPerson))
    }
  };

  const save = () => {
    const personsLinked = persons.filter(p => p.linked).map(p => p.id);
    safeFetch('/api/group/link', {
      method: 'POST',
      body: JSON.stringify({ 
        groupId,
        personIds: personsLinked
       }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({ dateUpdated }) => {
      const group = data.groups.find(g => g.id === groupId);

      if (!group) {
        return;
      }

      const newGroup = { ...group, dateUpdated };
      const newLinks = data.links.filter(l => l.groupId !== groupId);
      newLinks.push(...personsLinked.map(personId => ({ personId, groupId })));
      
      setData({
        ...data,
        links: newLinks,
        groups: replaceItemInArrayBy(data.groups, 'id', groupId, newGroup)
      });

      history.push(`/groups/${groupId}`);
    });
  };

  return (
    <div className="ns-persons-page">
        <PersonsLinkHeader save={save} saveDisabled={data.persons.length === 0} />
        <PersonList persons={persons} onCheck={onCheck} />
    </div>
  );
};