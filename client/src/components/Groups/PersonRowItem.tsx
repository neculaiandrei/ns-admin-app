import { Person } from "../../Data";

export interface PersonRowItemProps {
  person: Person
};

export const PersonRowItem: React.FC<PersonRowItemProps> = ({ person }) => (
  <li className="list-group-item ns-list-item">
    <div className="ns-list-item-info-person">
      <span>{person.firstName} {person.lastName}</span>
      <span>{person.jobTitle}</span>
    </div>
  </li>
);