import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { StoreContext } from '../../App';
import { GroupCard } from '../GroupCard';
import './GroupAdd.scss';

export const GroupAdd = () => {
  const { data, setData } = useContext(StoreContext);
  const history = useHistory();
  const [name, setName] = useState("");

  const save = () => {
    setData({
      ...data,
      groups: [
        ...data.groups,
        {
          id: Math.floor(Math.random() * 100),
          name: name,
          dateCreated: Date.now().toString(),
          dateUpdated: Date.now().toString()
        }
      ]
    });

    history.push('/groups');
  };

  return (
    <GroupCard
      title="Add Group"
      className="ns-group-add-card">
      <React.Fragment>
        <div>
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.currentTarget.value)} />
        </div>
        <button className="btn btn-primary ns-btn ns-btn-primary" onClick={save}>
          Save
        </button>
      </React.Fragment>
    </GroupCard>
  );;
}