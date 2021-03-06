import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { safeFetch } from '../../utils/fetchUtils';
import { StoreContext } from '../App';
import { PersonCard } from '../common/PersonCard';
import './PersonAdd.scss';

export const PersonAdd = () => {
  const { data, setData } = useContext(StoreContext);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const save = () => {
    if (firstName === "" || lastName === "") {
      return toast.error("Name fields cannot be empty", {
        position: "bottom-right",
        autoClose: 1200,
      });
    }

    safeFetch('/api/person', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, jobTitle }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(person => {
      setData({
        ...data,
        persons: [
          ...data.persons,
          person
        ]
      });
  
      history.push('/persons');
    });
  };

  return (
    <PersonCard
      title="Add Person"
      className="ns-person-add-card">
      <form onSubmit={e => e.preventDefault()}>
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
      </form>
    </PersonCard>
  );;
}