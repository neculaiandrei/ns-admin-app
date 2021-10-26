import { useCallback, useContext, useMemo } from "react";
import { useHistory } from "react-router";
import { useGroupParentIdParam } from "../../hooks/useGroupParentIdParam";
import { StoreContext } from "../App";
import { Group, Person } from "../Models";
import { GroupList } from "./GroupList";
import { GroupsPageHeader } from "./GroupsPageHeader";
import './GroupsPage.scss';


export const GroupsPage = () => {
  let groupParentId = useGroupParentIdParam();
  const history = useHistory();
  const { data } = useContext(StoreContext);

  const group = useMemo(() => {
    return data.groups.find(g => g.id === groupParentId)
  }, [groupParentId, data.groups]);

  const { groups, persons } = useMemo(() => {
    const result = {
      groups: [] as Group[],
      persons: [] as Person[]
    };

    result.groups = data.groups.filter(g => g.parentId === groupParentId);
    
    const l = data.links.filter(l => l.groupId === groupParentId).map(l => l.personId);
    result.persons = data.persons.filter(p => l.indexOf(p.id) !== -1);

    return result;
  }, [groupParentId, data]);

  const goBack = useCallback(() => {
    const g = data.groups.find(g => g.id === groupParentId);

    if (g?.parentId) {
      history.push(`/groups/${g?.parentId}`);
    } else {
      history.push('/groups');
    }
  }, [groupParentId, data.groups, history]);

  return (
    <div className="ns-groups-page">
      <GroupsPageHeader group={group} goBack={goBack} />
      <GroupList currentGroup={group} groups={groups} persons={persons} />
    </div>
  );
};