import { ListItem } from "../common/ListItem";
import { Person } from "../Models";

export interface PersonRowItemProps {
  person: Person
};

export const PersonRowItem: React.FC<PersonRowItemProps> = ({ person }) => {
  return (
    <ListItem>
      <div className="ns-list-item-info-person">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
    </ListItem>
  );
};