import { useHistory } from "react-router";
import { ListItem, ListItemButton } from "../common/ListItem";
import { Person } from "../Models";

export interface PersonRowItemProps {
  person: Person
}

export const PersonRowItem = ({ person }: PersonRowItemProps) => {
  const history = useHistory();

  const goToPersonDetail = () => {
    history.push(`/person/info/${person.id}`);
  };

  const goToPersonEdit = () => {
    history.push(`/person/edit/${person.id}`);
  };

  return (
    <ListItem>
      <div className="ns-list-item-info">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div>
        <ListItemButton iconClassName="fas fa-info-circle" onClick={goToPersonDetail} />
        <ListItemButton iconClassName="far fa-edit" onClick={goToPersonEdit} />
      </div>
    </ListItem>
  );
};