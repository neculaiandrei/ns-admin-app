import { connection } from "../DbConnection"

const add = (name: string, parentId: number | null, callback: (err: any, data: any) => void) => {
  const insertSql = `
INSERT INTO ns_admin_app.group
(name, parent_id, date_created, date_updated)
VALUES (?, ?, now(), now());

select 
    id 'id', 
    name 'name',
    parent_id 'parentId',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.group
where id = LAST_INSERT_ID()
  `;

  connection.query(insertSql, [name, parentId], (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, null)
    } else {
      callback(null, res[1][0]);
    }
  });
};

const update = (id: number, name: string, callback: (err: any, data: any) => void) => {
  const updateSql = `
update ns_admin_app.group
set name = ?, date_updated = now()
where id = ?;

select 
    id 'id', 
    name 'name',
    parent_id 'parentId',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?
  `;

  connection.query(updateSql, [name, id, id], (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, null)
    } else {
      callback(null, res[1][0]);
    }
  });
};

const GroupRepository = {
  add,
  update
};

export default GroupRepository;