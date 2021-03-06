import React from "react";
import { Person } from "../Models";
import { PersonRowItem } from "./PersonRowItem";

export const PersonList: React.FC<{ persons: Person[] }> = (props) => {
  return (
    <ul className="list-group">
      {props.persons.map(p => (
        <PersonRowItem person={p} key={p.id} />
      ))}
    </ul>
  );
};