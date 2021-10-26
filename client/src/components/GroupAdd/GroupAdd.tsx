import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useGroupParentIdParam } from '../../hooks/useGroupParentIdParam';
import { replaceItemInArrayBy } from '../../utils/arrayUtils';
import { safeFetch } from '../../utils/fetchUtils';
import { StoreContext } from '../App';
import { GroupCard } from '../common/GroupCard';
import './GroupAdd.scss';

export const GroupAdd = () => {
  const groupParentId = useGroupParentIdParam();
  const { data, setData } = useContext(StoreContext);
  const history = useHistory();
  const [name, setName] = useState("");

  const save = () => {
    safeFetch('/api/group', {
      method: 'POST',
      body: JSON.stringify({ name, parentId: groupParentId }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(([group, obj]) => {
      if (groupParentId) {
        const parentGroup = data.groups.find(g => g.id === groupParentId);

        if (!parentGroup) {
          return;
        }

        const newParentGrup = { ...parentGroup, dateUpdated: obj.dateUpdated };
        let newGroups = [...data.groups, group];
        newGroups = replaceItemInArrayBy(newGroups, 'id', groupParentId, newParentGrup);

        setData({
          ...data,
          groups: newGroups
        });

        history.push(`/groups/${groupParentId}`);
      } else {
        setData({
          ...data,
          groups: [
            ...data.groups,
            group
          ]
        });

        history.push('/groups');
      }
    });
  };

  return (
    <GroupCard
      title="Add Group"
      className="ns-group-add-card">
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
  );;
}