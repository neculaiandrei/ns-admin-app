import { useHistory } from "react-router-dom";
import { Person } from "../../Models";

export interface PersonRowItemProps {
  person: Person
};

export const PersonRowItem: React.FC<PersonRowItemProps> = ({ person }) => {
  const history = useHistory();
  
  const goToMove = () => {
    history.push('/move');
  };

  return (
    <li className="list-group-item ns-list-item">
      <div className="ns-list-item-info-person">
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div>
        <button className="btn btn-default btn-sm ns-btn" onClick={goToMove}>
          <i className="fas fa-arrows-alt"></i>
        </button>
      </div>
    </li>
  );
};