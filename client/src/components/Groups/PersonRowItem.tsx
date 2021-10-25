import { useHistory } from "react-router-dom";
import { ListItem, ListItemButton } from "../common/ListItem";
import { Person } from "../Models";

export interface PersonRowItemProps {
  person: Person
};

export const PersonRowItem: React.FC<PersonRowItemProps> = ({ person }) => {
  const history = useHistory();
  
  const goToMove = () => {
    history.push('/move');
  };

  return (
    <ListItem>
      <div className="ns-list-item-info-person">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div>
        <ListItemButton iconClassName="fas fa-arrows-alt" onClick={goToMove} />
      </div>
    </ListItem>
  );
};