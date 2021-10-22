import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import persons, { Person } from "../../Data";
import { PersonCard } from "../PersonCard";

const defaultPerson: Person = {
  id: 0,
  firstName: '',
  lastName: '',
  jobTitle: '',
  dateCreated: '',
  dateUpdated: '',
};

export const PersonEdit = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [person, setPerson] = useState<Person>({ ...defaultPerson });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    var p = persons.find(p => p.id === +id);

    if (p) {
      setPerson(p);
    }
  }, [id]);

  useEffect(() => {
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setJobTitle(person.jobTitle);
  }, [person]);

  const goToPersons = () => {
    history.push("/persons")
  };

  return (
    <PersonCard
      title={`${person.firstName} ${person.lastName}`}
      className="ns-person-add-card">
      <React.Fragment>
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
        <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersons}>
          Save
        </button>
      </React.Fragment>
    </PersonCard>
  );
}