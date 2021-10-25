import { useContext, useMemo } from "react";
import { StoreContext } from "../App";
import { Group, Person } from "../Models";
import { GroupRowItem } from "./GroupRowItem";
import { PersonRowItem } from "./PersonRowItem";

interface GroupListProps {
  parentId: number | null;
  onSelect: (id: number) => void;
}

export const GroupList: React.FC<GroupListProps> = (props) => {
  const { data } = useContext(StoreContext);
  const items = useMemo(() => {
    const result = {
      groups: [] as Group[],
      persons: [] as Person[]
    };

    result.groups = data.groups.filter(g => g.parentId === props.parentId);
    
    const l = data.links.filter(l => l.groupId === props.parentId).map(l => l.personId);
    result.persons = data.persons.filter(p => l.indexOf(p.id) !== -1);

    return result;
  }, [props.parentId, data.groups, data.links, data.persons]);

  return (
    <ul className="list-group">
      {items.groups.map(g => (
        <GroupRowItem group={g} onSelect={props.onSelect} key={g.id} />
      ))}
       {items.persons.map(p => (
        <PersonRowItem person={p} key={p.id} /> 
      ))}
    </ul>
  )
};