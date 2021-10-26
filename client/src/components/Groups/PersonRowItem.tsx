import { useHistory } from "react-router-dom";
import { ListItem, ListItemButton } from "../common/ListItem";
import { Group, Person } from "../Models";

export interface PersonRowItemProps {
  person: Person,
  currentGroup?: Group
};

export const PersonRowItem: React.FC<PersonRowItemProps> = ({ person, currentGroup }) => {
  const history = useHistory();
  
  const goToMove = () => {
    history.push(`/move/person/${person.id}/${currentGroup?.id}`);
  };

  return (
    <ListItem>
      <div className="ns-list-item-info-person">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div className="ns-list-item-buttons-container">
        <ListItemButton iconClassName="fas fa-arrows-alt" onClick={goToMove} />
      </div>
    </ListItem>
  );
};