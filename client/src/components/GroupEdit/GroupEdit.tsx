import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Group } from "../../Models";
import { StoreContext } from "../App";
import { GroupCard } from "../GroupCard";
import './GroupEdit.scss';

const defaultPerson: Group = {
  id: 0,
  name: '',
  dateCreated: '',
  dateUpdated: '',
};

export const GroupEdit = () => {
  const { data } = useContext(StoreContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [group, setGroup] = useState<Group>({ ...defaultPerson });
  const [name, setName] = useState("");

  useEffect(() => {
    const g = data.groups.find(p => p.id === +id);

    if (g) {
      setGroup(g);
    }
  }, [id, data.groups]);

  useEffect(() => {
    setName(group.name);
  }, [group]);

  const goToGroups = () => {
    history.push("/groups")
  };

  return (
    <GroupCard
      title={`${group.name}`}
      className="ns-group-edit-card">
      <React.Fragment>
        <div>
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.currentTarget.value)} />
        </div>
        <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToGroups}>
          Save
        </button>
      </React.Fragment>
    </GroupCard>
  );
}