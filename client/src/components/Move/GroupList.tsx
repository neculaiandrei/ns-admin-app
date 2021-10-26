import { Group, Person } from "../Models";
import { GroupRowItem } from "./GroupRowItem";
import { PersonRowItem } from "./PersonRowItem";

interface GroupListProps {
  groups: Group[],
  persons: Person[],
  onGroupSelect: (group: Group) => void,
  groupToMove: Group
}

export const GroupList: React.FC<GroupListProps> = (props) => {
  return (
    <ul className="list-group">
      {props.groups.map(g => (
        <GroupRowItem disabled={g.id === props.groupToMove.id} group={g} key={g.id} onSelect={props.onGroupSelect} />
      ))}
       {props.persons.map(p => (
        <PersonRowItem person={p} key={p.id} /> 
      ))}
    </ul>
  )
};