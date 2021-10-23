import { useCallback, useContext, useMemo } from "react";
import { useHistory, useParams } from "react-router";
import { StoreContext } from "../App";
import { GroupList } from "./GroupList";
import { GroupsPageHeader } from "./GroupsPageHeader";

const useParentIdParam = () => {
  const { parentId } = useParams<{ parentId: string }>();

  if (parentId === undefined || parentId === null) {
    return undefined;
  }
  
  const isNum = /^\d+$/.test(parentId);
  return isNum ? +parentId : undefined;
};

export const GroupsPage = () => {
  let parentId = useParentIdParam();
  const history = useHistory();
  const { data } = useContext(StoreContext);

  const group = useMemo(() => {
    return data.groups.find(g => g.id === parentId)
  }, [parentId, data.groups]);

  const goBack = useCallback(() => {
    const g = data.groups.find(g => g.id === parentId);

    if (g?.parentId) {
      history.push(`/groups/${g?.parentId}`);
    } else {
      history.push('groups');
    }
  }, [parentId, data.groups]);

  const goForward = (id: number) => {
    history.push(`/groups/${id}`);
  };

  return (
    <div className="ns-groups-page">
      <GroupsPageHeader group={group} goBack={goBack} />
      <GroupList parentId={parentId} onSelect={goForward}/>
    </div>
  );
};