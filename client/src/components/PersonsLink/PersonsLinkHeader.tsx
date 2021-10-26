import React from "react";

interface PersonsLinkHeaderProps {
  saveDisabled: boolean,
  save: () => void
}

export const PersonsLinkHeader: React.FC<PersonsLinkHeaderProps> = (props) => {
  return (
    <div className="header">
      <div>Link Persons</div>
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={props.save} disabled={props.saveDisabled} >
        <i className="fas fa-check"></i> Save
      </button>
    </div>
  );
}