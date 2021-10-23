import { useContext } from "react";
import { StoreContext } from "../../App";
import { PersonRowItem } from "./PersonRowItem";

export const PersonList = () => {
  const data = useContext(StoreContext);
  
  return (
    <ul className="list-group">
      {data.persons.map(p => (
        <PersonRowItem person={p} key={p.id} />
      ))}
    </ul>
  );
};