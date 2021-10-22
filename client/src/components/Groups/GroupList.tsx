import { useMemo } from "react";
import { Group, groups, links, persons, Person } from "../../Data";
import { GroupRowItem } from "./GroupRowItem";
import { PersonRowItem } from "./PersonRowItem";

interface GroupListProps {
  parentId?: number;
  onSelect: (id: number) => void;
}

export const GroupList: React.FC<GroupListProps> = (props) => {
  const items = useMemo(() => {
    const result = {
      groups: [] as Group[],
      persons: [] as Person[]
    };

    result.groups = groups.filter(g => g.parentId === props.parentId);
    
    const l = links.filter(l => l.groupId === props.parentId).map(l => l.personId);
    result.persons = persons.filter(p => l.indexOf(p.id) !== -1);

    return result;
  }, [props.parentId]);

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