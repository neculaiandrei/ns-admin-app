import React from "react";
import { useHistory } from "react-router";
import { Group } from "../../Data";
import './GroupsPage.scss';

interface GroupsPageHeaderProps {
  group?: Group;
  goBack: () => void;
}

export const GroupsPageHeader: React.FC<GroupsPageHeaderProps> = ({ group, goBack }) => {
  const history = useHistory();

  const goToPersonAdd = () => {
    history.push("/group/add");
  };

  const goToPersonsLink = () => {
    history.push("/persons/link");
  };

  return (
    <div className="header">
      <div className="nav">
        {group ? (
          <React.Fragment>
            <span style={{cursor: "pointer"}} onClick={goBack}>
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>&nbsp;&nbsp;{group?.name}</span>
          </React.Fragment>
        ) : <div></div>}
      </div>
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonAdd}>
        <i className="fas fa-plus-circle"></i> Add
      </button>
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonsLink}>
        <i className="fas fa-link"></i> Link
      </button>
    </div>
  );
}