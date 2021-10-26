import { connection } from "../DbConnection"

const add = (name: string, parentId: number | null, callback: (err: any, data: any) => void) => {
  const insertSql = `
INSERT INTO ns_admin_app.group
(name, parent_id, date_created, date_updated)
VALUES (?, ?, now(), now());

update ns_admin_app.group
set date_updated = now()
where id = ?;

select 
    id 'id', 
    name 'name',
    parent_id 'parentId',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.group
where id = LAST_INSERT_ID();

select date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?;
  `;

  connection.beginTransaction(() => {
    connection.query(insertSql, [name, parentId, parentId, parentId], (sqlErr, res) => {
      if (sqlErr) {
        console.log(sqlErr.message);
        connection.rollback(tranErr => {
          if (tranErr) {
            console.log(tranErr.message);
          } else {
            callback(sqlErr, null);
          }
        });
      } else {
        connection.commit(tranErr => {
          if (tranErr) {
            console.log(tranErr.message);
          } else {
            callback(null, [res[2][0], res[3][0]]);
          }
        })
      }
    });
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

const link = (groupId: number, personIds: number[], callback: (err: any, data: any) => void) => {
  const linkSql = `
delete from ns_admin_app.group_person
where group_id = ?;

insert into ns_admin_app.group_person
(person_id, group_id)
values ?;

update ns_admin_app.group
set date_updated = now()
where id = ?;

select date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?;
  `;

  const insertParams = personIds.map(personId => [ personId, groupId ]);
  
  connection.beginTransaction(() => {
    connection.query(linkSql, [groupId, insertParams, groupId, groupId], (sqlErr, res) => {
      if (sqlErr) {
        console.log(sqlErr.message);
        connection.rollback(tranErr => {
          if (tranErr) {
            console.log(tranErr.message);
          } else {
            callback(sqlErr, null);
          }
        });
      } else {
        connection.commit(tranErr => {
          if (tranErr) {
            console.log(tranErr.message);
          } else {
            callback(null, res[3][0]);
          }
        });
      }
    });
  });
}

const GroupRepository = {
  add,
  update,
  link
};

export default GroupRepository;