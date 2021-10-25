import React from "react";
import { PersonRowItem } from "./PersonRowItem";
import { CheckedPerson } from "./PersonsLink";

export const PersonList: React.FC<{ persons: CheckedPerson[]}> = (props) => {
  return (
    <ul className="list-group">
      {props.persons.map(p => (
        <PersonRowItem person={p} key={p.id} />
      ))}
    </ul>
  );
};