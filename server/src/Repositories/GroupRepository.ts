import { connection } from "../DbConnection";
import { repositoryCallback } from "../Models";

const add = (name: string, parentId: number | null, callback: repositoryCallback) => {
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

const update = (id: number, name: string, callback: repositoryCallback) => {
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

const link = (groupId: number, personIds: number[], callback: repositoryCallback) => {
  const insertParams = personIds.map(personId => [ personId, groupId ]);
  
  const linkSql = `
delete from ns_admin_app.group_person
where group_id = ?;

${insertParams.length ? `
insert into ns_admin_app.group_person
(person_id, group_id)
values ?;
`: `select 1;`} 

update ns_admin_app.group
set date_updated = now()
where id = ?;

select date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?;
  `;

  const moveParams = insertParams.length ? 
    [groupId, insertParams, groupId, groupId] :
    [groupId, groupId, groupId];

  connection.beginTransaction(() => {
    connection.query(linkSql, moveParams, (sqlErr, res) => {
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

const move = (groupId: number, fromGroupId: number | null, toGroupId: number | null, callback: repositoryCallback) => {
  const moveSql = `
update ns_admin_app.group
set parent_id = ?, date_updated = now()
where id = ?;

update ns_admin_app.group
set date_updated = now()
where id = ?;

update ns_admin_app.group
set date_updated = now()
where id = ?;

select date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?;

select date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?;

select date_updated 'dateUpdated'
from ns_admin_app.group
where id = ?;
  `;

  connection.beginTransaction(() => {
    connection.query(moveSql, [
      toGroupId, groupId, 
      fromGroupId, toGroupId,
      groupId, fromGroupId, toGroupId
    ], (sqlErr, res) => {
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
            callback(null, [res[3][0], res[4][0], res[5][0]]);
          }
        });
      }
    });
  });
};

const GroupRepository = {
  add,
  update,
  link,
  move
};

export default GroupRepository;