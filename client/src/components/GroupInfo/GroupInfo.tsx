import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../App";
import { Group } from "../../Models";
import { GroupCard } from "../GroupCard";
import './GroupInfo.scss';

export const GroupInfo = () => {
  const { data } = useContext(StoreContext);
  let { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group>();
  
  useEffect(() => {
    setGroup(data.groups.filter(p => p.id === +id)[0]);
  }, [id, data.groups]);

  return (
    <GroupCard 
      title={`${group?.name}`}
      className="ns-person-info-card">
        <React.Fragment>
          <p className="row">
            <span className="col">Name</span>
            <span className="col">{group?.name}</span>
          </p>
          <p className="row">
            <span className="col">Date created</span>
            <span className="col">{group?.dateCreated}</span>
          </p>
          <p className="row">
            <span className="col">Date updated</span>
            <span className="col">{group?.dateUpdated}</span>
          </p>
        </React.Fragment>
    </GroupCard>
  )
};