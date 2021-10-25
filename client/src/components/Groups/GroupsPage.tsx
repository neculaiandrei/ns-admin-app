import { useCallback, useContext, useMemo } from "react";
import { useHistory } from "react-router";
import { useGroupParentIdParam } from "../../hooks/useGroupParentIdParam";
import { StoreContext } from "../App";
import { GroupList } from "./GroupList";
import { GroupsPageHeader } from "./GroupsPageHeader";

export const GroupsPage = () => {
  let groupParentId = useGroupParentIdParam();
  const history = useHistory();
  const { data } = useContext(StoreContext);

  const group = useMemo(() => {
    return data.groups.find(g => g.id === groupParentId)
  }, [groupParentId, data.groups]);

  const goBack = useCallback(() => {
    const g = data.groups.find(g => g.id === groupParentId);

    if (g?.parentId) {
      history.push(`/groups/${g?.parentId}`);
    } else {
      history.push('/groups');
    }
  }, [groupParentId, data.groups]);

  const goForward = (id: number) => {
    history.push(`/groups/${id}`);
  };

  return (
    <div className="ns-groups-page">
      <GroupsPageHeader group={group} goBack={goBack} />
      <GroupList parentId={groupParentId} onSelect={goForward}/>
    </div>
  );
};