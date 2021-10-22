import { useHistory } from "react-router";
import { Person } from "../../Data";

export interface PersonRowItemProps {
  person: Person
}

export const PersonRowItem = ({ person }: PersonRowItemProps) => {
  const history = useHistory();

  const goToPersonDetail = () => {
    history.push(`/person/info/${person.id}`);
  }

  return (
    <li className="list-group-item ns-list-item">
      <div>
        <span>{person.firstName} {person.lastName}</span>
        <span>{person.jobTitle}</span>
      </div>
      <div>
        <button className="btn btn-default btn-sm ns-btn" onClick={goToPersonDetail}>
          <i className="fas fa-info-circle"></i>
        </button>
        <button className="btn btn-default btn-sm ns-btn">
          <i className="far fa-edit"></i>
        </button>
      </div>
    </li>
  );
};