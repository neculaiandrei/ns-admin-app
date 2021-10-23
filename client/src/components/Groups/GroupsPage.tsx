import { useCallback, useContext, useMemo, useState } from "react";
import { StoreContext } from "../../App";
import { GroupList } from "./GroupList";
import { GroupsPageHeader } from "./GroupsPageHeader";

export const GroupsPage = () => {
  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const { data } = useContext(StoreContext);

  const group = useMemo(() => {
    return data.groups.find(g => g.id === parentId)
  }, [parentId, data.groups]);

  const goBack = useCallback(() => {
    const g = data.groups.find(g => g.id === parentId);
    setParentId(g?.parentId);
  }, [parentId, data.groups]);

  return (
    <div className="ns-groups-page">
      <GroupsPageHeader group={group} goBack={goBack} />
      <GroupList parentId={parentId} onSelect={id => setParentId(id)}/>
    </div>
  );
};