import React from "react";
import { Group } from "../Models";
import { GroupsNav } from "../Groups";

interface MoveHeaderProps {
  group?: Group;
  goBack: () => void;
  saveDisabled: boolean;
  save: () => void;
}

export const MoveHeader: React.FC<MoveHeaderProps> = ({ group, goBack, saveDisabled, save }) => (
  <div className="header">
    <GroupsNav group={group} goBack={goBack} />
    <button 
      className="btn btn-primary ns-btn ns-btn-primary" 
      disabled={saveDisabled} 
      onClick={() => !saveDisabled && save()}
    >
      <i className="fas fa-check"></i> Move
    </button>
  </div>
);