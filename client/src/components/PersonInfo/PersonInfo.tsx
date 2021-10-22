import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import persons, { Person } from '../../Data';
import { PersonCard } from "../PersonCard";
import './PersonInfo.scss';

export const PersonInfo = () => {
  let { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person>();
  
  useEffect(() => {
    setPerson(persons.filter(p => p.id === +id)[0]);
  }, [id]);

  return (
    <PersonCard 
      title={`${person?.firstName} ${person?.lastName}`}
      className="ns-person-info-card">
        <React.Fragment>
          <p className="row">
            <span className="col">First name</span>
            <span className="col">{person?.firstName}</span>
          </p>
          <p className="row">
            <span className="col">Last name</span>
            <span className="col">{person?.lastName}</span>
          </p>
          <p className="row">
            <span className="col">Job title</span>
            <span className="col">{person?.jobTitle}</span>
          </p>
          <p className="row">
            <span className="col">Date created</span>
            <span className="col">{person?.dateCreated}</span>
          </p>
          <p className="row">
            <span className="col">Date updated</span>
            <span className="col">{person?.dateUpdated}</span>
          </p>
        </React.Fragment>
    </PersonCard>
  )
};