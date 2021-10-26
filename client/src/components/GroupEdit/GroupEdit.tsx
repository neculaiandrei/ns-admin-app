import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getDefaultGroup, Group } from "../Models";
import { StoreContext } from "../App";
import { GroupCard } from "../common/GroupCard";
import './GroupEdit.scss';
import { safeFetch } from "../../utils/fetchUtils";
import { replaceItemBy } from "../../utils/arrayUtils";

export const GroupEdit = () => {
  const { data, setData } = useContext(StoreContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [group, setGroup] = useState<Group>(getDefaultGroup());
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

  const save = () => {
    safeFetch('/api/group', {
      method: 'PUT',
      body: JSON.stringify({ name, id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(newGroup => {
      setData({
        ...data,
        groups: replaceItemBy(data.groups, 'id', group.id, newGroup)
      });
  
      if (group.parentId) {
        history.push(`/groups/${group.parentId}`);
      } else {
        history.push('/groups');
      }
    });
  };

  return (
    <GroupCard
      title={`${group.name}`}
      className="ns-group-edit-card">
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.currentTarget.value)} />
        </div>
        <button className="btn btn-primary ns-btn ns-btn-primary" onClick={save}>
          Save
        </button>
      </form>
    </GroupCard>
  );
}