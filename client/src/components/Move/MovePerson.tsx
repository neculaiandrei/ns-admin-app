import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { replaceItemBy } from "../../utils/arrayUtils";
import { safeFetch } from "../../utils/fetchUtils";
import { StoreContext } from "../App";
import { getDefaultGroup, getDefaultPerson, Group, Person } from "../Models";
import { GroupList } from "./GroupList";
import './Move.scss';
import { MoveHeader } from "./MoveHeader";

const useMovePersonParams = () => {
  let params = useParams<{ groupId: string, personId: string }>();

  return {
    groupId: +params.groupId,
    personId: +params.personId
  };
};

export const MovePerson = () => {
  const history = useHistory();
  const { data, setData } = useContext(StoreContext);
  let movePersonParams = useMovePersonParams();
  const [personToMove, setPersonToMove] = useState<Person>(getDefaultPerson());
  const [fromGroup, setFromGroup] = useState<Group>(getDefaultGroup());
  const [toGroup, setToGroup] = useState<Group | undefined>(undefined);
  
  useEffect(() => {
    const personToMove = data.persons.find(p => p.id === movePersonParams.personId);
    const newFromGroup = data.groups.find(g => g.id === movePersonParams.groupId);
    
    personToMove && setPersonToMove(personToMove);
    newFromGroup && setFromGroup(newFromGroup);
    setToGroup(newFromGroup);
  }, [movePersonParams.groupId, movePersonParams.groupId, data.groups]);

  const { groups, persons } = useMemo(() => {
    const result = {
      groups: [] as Group[],
      persons: [] as Person[]
    };

    result.groups = data.groups.filter(g => g.parentId === (toGroup ? toGroup.id : null));
    
    const links = data.links.filter(l => l.groupId === toGroup?.id).map(l => l.personId);
    result.persons = data.persons.filter(p => links.indexOf(p.id) !== -1);

    return result;
  }, [toGroup, data]);

  const onGroupSelect = (group: Group) => {
    setToGroup(group);
  };

  const goBack = () => {
    const parentGroup = data.groups.find(g => g.id === toGroup?.parentId);
    setToGroup(parentGroup);
  };

  const saveDisabled = () => {
    if (toGroup === undefined) {
      return true;
    }

    if (fromGroup.id === toGroup.id) {
      return true;
    }

    const alreadyExists = data.links
      .some(l => l.groupId === toGroup.id && l.personId == personToMove.id);

    if (alreadyExists) {
      return true;
    }

    return false;
  };

  const save = () => {
    safeFetch('/api/person/move', {
      method: 'PUT',
      body: JSON.stringify({ 
        personId: personToMove.id,
        fromGroupId: fromGroup.id,
        toGroupId: toGroup?.id
       }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(([
      fromResult,
      toResult
    ]) => {
      const newLinks = data.links.filter(l => !(l.personId === personToMove.id && l.groupId === fromGroup.id));
      newLinks.push({ personId: personToMove.id, groupId: toGroup ? toGroup.id : -1 });

      const newFromGroup: Group = {...fromGroup, dateUpdated: fromResult.dateUpdated };
      const newToGroup: Group = { ...toGroup, dateUpdated: toResult.dateUpdated} as Group;

      let newGroups = replaceItemBy(data.groups, 'id', fromGroup.id, newFromGroup);
      newGroups = replaceItemBy(newGroups, 'id', toGroup?.id, newToGroup);

      setData({
        ...data,
        groups: newGroups,
        links: newLinks
      });

      history.push(`/groups/${toGroup?.id}`);
    });
  };

  const cancel = () => {
    history.goBack();
  };

  return (
    <div className="ns-move-page">
      <MoveHeader 
        group={toGroup} 
        goBack={goBack} 
        saveDisabled={saveDisabled()}
        save={save}
        cancel={cancel} />
      <GroupList groups={groups} persons={persons} onGroupSelect={onGroupSelect} />
    </div>
  );
}