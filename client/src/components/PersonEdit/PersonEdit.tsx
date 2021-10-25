import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Person } from "../Models";
import { PersonCard } from "../PersonCard";
import { StoreContext } from "../App";
import './PersonEdit.scss';
import { safeFetch } from "../../utils/fetchUtils";
import { replaceItemInArrayBy } from "../../utils/arrayUtils";

const defaultPerson: Person = {
  id: 0,
  firstName: '',
  lastName: '',
  jobTitle: '',
  dateCreated: '',
  dateUpdated: '',
};

export const PersonEdit = () => {
  const { data, setData } = useContext(StoreContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [person, setPerson] = useState<Person>({ ...defaultPerson });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const p = data.persons.find(p => p.id === +id);

    if (p) {
      setPerson(p);
    }
  }, [id, data.persons]);

  useEffect(() => {
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setJobTitle(person.jobTitle);
  }, [person]);

  const save = () => {
    safeFetch('/api/person', {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, jobTitle, id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(newPerson => {
      setData({
        ...data,
        persons: replaceItemInArrayBy(data.persons, 'id', person.id, newPerson)
      });
  
      history.push('/persons');
    });
  };

  return (
    <PersonCard
      title={`${person.firstName} ${person.lastName}`}
      className="ns-person-edit-card">
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label className="form-label">First name</label>
          <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
        </div>
        <div>
          <label className="form-label">Job title</label>
          <input type="text" className="form-control" value={jobTitle} onChange={e => setJobTitle(e.currentTarget.value)} />
        </div>
        <button className="btn btn-primary ns-btn ns-btn-primary" onClick={save}>
          Save
        </button>
      </form>
    </PersonCard>
  );
}