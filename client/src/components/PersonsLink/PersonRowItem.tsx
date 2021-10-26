import { ListItem } from "../common/ListItem";
import { LinkedPerson } from "./PersonsLink";

export interface PersonRowItemProps {
  person: LinkedPerson,
  onCheck: (id: number) => void;
}

export const PersonRowItem = ({ person, onCheck }: PersonRowItemProps) => {
  return (
    <ListItem>
      <div className="ns-list-item-info">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div className="ns-list-item-buttons-container">
        <input type="checkbox" checked={person.linked} onChange={() => onCheck(person.id)}></input>
      </div>
    </ListItem>
  );
};