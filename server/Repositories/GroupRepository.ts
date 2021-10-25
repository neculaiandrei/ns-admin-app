import { connection } from "../DbConnection"

const add = (name: string, callback: (err: any, data: any) => void) => {
  const insertSql = `
INSERT INTO ns_admin_app.group
(name, date_created, date_updated)
VALUES (?, now(), now());

select 
	  id 'id', 
    name 'name',
    parentId 'parentId',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.group
where id = LAST_INSERT_ID()
  `;

  connection.query(insertSql, [name], (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, null)
    } else {
      callback(null, res[1][0]);
    }
  });
};

const GroupRepository = {
  add
};

export default GroupRepository;