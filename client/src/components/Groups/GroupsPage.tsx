import { useMemo, useState } from "react";
import { groups } from "../../Data";
import { GroupList } from "./GroupList";
import { GroupsPageHeader } from "./GroupsPageHeader";

export const GroupsPage = () => {
  const [parentId, setParentId] = useState<number | undefined>(undefined);

  const group = useMemo(() => {
    return groups.find(g => g.id === parentId)
  }, [parentId]);

  return (
    <div className="ns-groups-page">
      <GroupsPageHeader group={group} />
      <GroupList parentId={parentId} onSelect={id => setParentId(id)}/>
    </div>
  );
};