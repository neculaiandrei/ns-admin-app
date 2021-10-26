import { Group, Person } from "../Models";
import { GroupRowItem } from "./GroupRowItem";
import { PersonRowItem } from "./PersonRowItem";

interface GroupListProps {
  groups: Group[],
  persons: Person[],
  currentGroup?: Group
}

export const GroupList: React.FC<GroupListProps> = (props) => {
  return (
    <ul className="list-group">
      {props.groups.map(g => (
        <GroupRowItem group={g} key={g.id} />
      ))}
       {props.persons.map(p => (
        <PersonRowItem currentGroup={props.currentGroup} person={p} key={p.id} /> 
      ))}
    </ul>
  )
};