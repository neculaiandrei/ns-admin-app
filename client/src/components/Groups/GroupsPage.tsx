import { useCallback, useMemo, useState } from "react";
import { groups } from "../../Data";
import { GroupList } from "./GroupList";
import { GroupsPageHeader } from "./GroupsPageHeader";

export const GroupsPage = () => {
  const [parentId, setParentId] = useState<number | undefined>(undefined);

  const group = useMemo(() => {
    return groups.find(g => g.id === parentId)
  }, [parentId]);

  const goBack = useCallback(() => {
    const g = groups.find(g => g.id === parentId);
    setParentId(g?.parentId);
  }, [parentId]);

  return (
    <div className="ns-groups-page">
      <GroupsPageHeader group={group} goBack={goBack} />
      <GroupList parentId={parentId} onSelect={id => setParentId(id)}/>
    </div>
  );
};