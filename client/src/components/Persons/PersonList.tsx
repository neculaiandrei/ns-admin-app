import { Person } from "../../Data";
import { PersonRowItem } from "./PersonRowItem";

export interface PersonListProps {
  persons: Person[]
}

export const PersonList = ({ persons }: PersonListProps) => {
  return (
    <ul className="list-group ns-person-list">
      {persons.map(p => (
        <PersonRowItem person={p} key={p.id} />
      ))}
    </ul>
  );
};