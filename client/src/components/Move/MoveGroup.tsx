import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { replaceItemBy } from "../../utils/arrayUtils";
import { safeFetch } from "../../utils/fetchUtils";
import { StoreContext } from "../App";
import { Group, Person } from "../Models";
import { GroupList } from "./GroupList";
import './Move.scss';
import { MoveHeader } from "./MoveHeader";

const useMoveGroupParams = () => {
  let params = useParams<{ groupId: string }>();

  return +params.groupId;
};

const defaultGroup: Group = {
  id: 0,
  name: '',
  dateCreated: '',
  dateUpdated: '',
  parentId: null
};

export const MoveGroup = () => {
  const history = useHistory();
  const { data, setData } = useContext(StoreContext);
  let groupToMoveId = useMoveGroupParams();
  const [groupToMove, setGroupToMove] = useState<Group>({...defaultGroup});
  const [toGroup, setToGroup] = useState<Group | undefined>(undefined);
  
  useEffect(() => {
    const group = data.groups.find(g => g.id === groupToMoveId);

    if (group) {
      const newToGroup = data.groups.find(g => g.id === group.parentId);
      setToGroup(newToGroup);
      setGroupToMove(group);
    }
  }, [groupToMoveId, data.groups]);

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

  const save = () => {
    safeFetch('/api/group/move', {
      method: 'PUT',
      body: JSON.stringify({ 
        groupId: groupToMoveId,
        fromGroupId: groupToMove.parentId,
        toGroupId: toGroup?.id
       }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(([
      groupResult,
      fromResult,
      toResult
    ]) => {
      const newGroupToMove: Group = { 
        ...groupToMove, 
        dateUpdated: groupResult.dateUpdated, 
        parentId: toGroup ? toGroup.id : null 
      };
      let newGroups = replaceItemBy(data.groups, 'id', groupToMove.id, newGroupToMove);

      if (groupToMove.parentId) {
        const fromGroupToMove = data.groups.find(g => g.id === groupToMove.parentId);

        if (fromGroupToMove) {
          const newFromGroupToMove: Group = {...fromGroupToMove, dateUpdated: fromResult.dateUpdated };
          newGroups = replaceItemBy(newGroups, 'id', fromGroupToMove.id, newFromGroupToMove);
        }
      }

      if (toGroup) {
        const newToGroup: Group = {...toGroup, dateUpdated: toResult.dateUpdated };
        newGroups = replaceItemBy(newGroups, 'id', toGroup.id, newToGroup);
      }

      setData({
        ...data, 
        groups: newGroups
      });

      if (toGroup) {
        history.push(`/groups/${toGroup.id}`)
      } else {
        history.push(`/groups`);
      }
    });
  };

  return (
    <div className="ns-move-page">
      <MoveHeader 
        group={toGroup} 
        goBack={goBack} 
        saveDisabled={groupToMove.parentId === (toGroup ? toGroup.id : null)}
        save={save} />
      <GroupList groupToMove={groupToMove} groups={groups} persons={persons} onGroupSelect={onGroupSelect} />
    </div>
  );
}