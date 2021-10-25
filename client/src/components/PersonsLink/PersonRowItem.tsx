import { ListItem } from "../common/ListItem";
import { CheckedPerson } from "./PersonsLink";

export interface PersonRowItemProps {
  person: CheckedPerson
}

export const PersonRowItem = ({ person }: PersonRowItemProps) => {
  return (
    <ListItem>
      <div className="ns-list-item-info">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div>
        <input type="checkbox" checked={person.checked}></input>
      </div>
    </ListItem>
  );
};