import React from 'react';
import { PersonCard } from '../PersonCard';
import './PersonAdd.scss';

export const PersonAdd = () => {
  return (
    <PersonCard
      title="Add Person"
      className="ns-person-add-card">
      <React.Fragment>
        <div>
          <label className="form-label">First name</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <label className="form-label">Job title</label>
          <input type="text" className="form-control" />
        </div>
        <button className="btn btn-primary ns-btn ns-btn-primary">
          Save
        </button>
      </React.Fragment>
    </PersonCard>
  );;
}