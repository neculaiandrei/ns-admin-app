import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { StoreContext } from '../App';
import { PersonCard } from '../PersonCard';
import './PersonAdd.scss';

export const PersonAdd = () => {
  const { data, setData } = useContext(StoreContext);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const save = () => {
    setData({
      ...data,
      persons: [
        ...data.persons,
        {
          id: Math.floor(Math.random() * 100),
          firstName: firstName,
          lastName: lastName,
          jobTitle: jobTitle,
          dateCreated: '...',
          dateUpdated: '...'
        }
      ]
    });

    history.push('/persons');
  };

  return (
    <PersonCard
      title="Add Person"
      className="ns-person-add-card">
      <React.Fragment>
        <div>
          <label className="form-label">First name</label>
          <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.currentTarget.value)}/>
        </div>
        <div>
          <label className="form-label">Job title</label>
          <input type="text" className="form-control" value={jobTitle} onChange={e => setJobTitle(e.currentTarget.value)}/>
        </div>
        <button className="btn btn-primary ns-btn ns-btn-primary" onClick={save}>
          Save
        </button>
      </React.Fragment>
    </PersonCard>
  );;
}