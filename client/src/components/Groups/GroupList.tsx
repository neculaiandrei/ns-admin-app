import { useContext, useMemo } from "react";
import { StoreContext } from "../App";
import { Group, Person } from "../Models";
import { GroupRowItem } from "./GroupRowItem";
import { PersonRowItem } from "./PersonRowItem";

interface GroupListProps {
  groups: Group[],
  persons: Person[]
  onSelect: (id: number) => void;
}

export const GroupList: React.FC<GroupListProps> = (props) => {
  return (
    <ul className="list-group">
      {props.groups.map(g => (
        <GroupRowItem group={g} onSelect={props.onSelect} key={g.id} />
      ))}
       {props.persons.map(p => (
        <PersonRowItem person={p} key={p.id} /> 
      ))}
    </ul>
  )
};