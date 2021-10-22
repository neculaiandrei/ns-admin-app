import { Person } from "../../Data";

export interface PersonRowItemProps {
  person: Person
}

export const PersonRowItem = ({ person }: PersonRowItemProps) => (
  <li className="list-group-item ns-list-item">
    <div>
      <span>{person.firstName} {person.lastName}</span>
      <span>{person.jobTitle}</span>
    </div>
    <div>
      <button className="btn btn-default btn-sm ns-btn">
        <i className="far fa-edit"></i>
      </button>
    </div>
  </li>
);