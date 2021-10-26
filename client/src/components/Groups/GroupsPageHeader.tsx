import React from "react";
import { useHistory } from "react-router";
import { Group } from "../Models";
import { GroupsNav } from "./GroupsNav";

interface GroupsPageHeaderProps {
  group?: Group;
  goBack: () => void;
}

export const GroupsPageHeader: React.FC<GroupsPageHeaderProps> = ({ group, goBack }) => {
  const history = useHistory();

  const goToGroupAdd = () => {
    if (group) {
      history.push(`/group/add/${group.id}`);
    } else {
      history.push(`/group/add/`);
    }
  };

  const goToPersonsLink = () => {
    history.push(`/persons/link/${group?.id}`);
  };

  return (
    <div className="header">
      <GroupsNav group={group} goBack={goBack} />
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToGroupAdd}>
        <i className="fas fa-plus-circle"></i> Add
      </button>
      {group && (
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonsLink}>
        <i className="fas fa-link"></i> Link
      </button>)}
    </div>
  );
}