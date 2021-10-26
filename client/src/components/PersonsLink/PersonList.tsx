import React from "react";
import { PersonRowItem } from "./PersonRowItem";
import { LinkedPerson } from "./PersonsLink";

export const PersonList: React.FC<{ 
  persons: LinkedPerson[], 
  onCheck: (id: number) => void
}> = (props) => {
  return (
    <ul className="list-group">
      {props.persons.map(p => (
        <PersonRowItem person={p} key={p.id} onCheck={props.onCheck} />
      ))}
    </ul>
  );
};