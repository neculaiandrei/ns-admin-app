import { PersonRowItem } from "./PersonRowItem";
import { persons } from "../../Data";

export const PersonList = () => {
  return (
    <ul className="list-group">
      {persons.map(p => (
        <PersonRowItem person={p} key={p.id} />
      ))}
    </ul>
  );
};