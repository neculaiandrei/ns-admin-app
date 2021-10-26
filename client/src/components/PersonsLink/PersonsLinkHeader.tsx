import React from "react";

export const PersonsLinkHeader: React.FC<{ save: () => void }> = (props) => {
  return (
    <div className="header">
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={props.save} >
        <i className="fas fa-check"></i> Save
      </button>
    </div>
  );
}