import React from "react";
import { Group } from "../Models";

interface GroupsNavProps {
  group?: Group,
  goBack: () => void;
}

export const GroupsNav: React.FC<GroupsNavProps> = (props) => (
  <div className="nav">
    {props.group ? ( 
      <React.Fragment>
        <span style={{cursor: "pointer"}} onClick={props.goBack}>
          <i className="fas fa-arrow-left"></i>
        </span>
        <span>&nbsp;&nbsp;{props.group?.name}</span>
      </React.Fragment>
    ) : <div></div>}
  </div>
)