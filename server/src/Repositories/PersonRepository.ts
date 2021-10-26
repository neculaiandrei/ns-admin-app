import { connection } from "../DbConnection";
import { repositoryCallback } from "../Models";

const add = (firstName: string, lastName: string, jobTitle: string, callback: repositoryCallback) => {
  const insertSql = `
INSERT INTO ns_admin_app.person
(first_name, last_name, job_title, date_created, date_updated)
VALUES (?, ?, ?, now(), now());

select 
    id 'id', 
    first_name 'firstName',
    last_name 'lastName',
    job_title 'jobTitle',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.person
where id = LAST_INSERT_ID()
  `;

  connection.query(insertSql, [firstName, lastName, jobTitle], (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, null)
    } else {
      callback(null, res[1][0]);
    }
  });
};

const update = (id: number, firstName: string, lastName: string, jobTitle: string, callback: repositoryCallback) => {
  const updateSql = `
update ns_admin_app.person
set first_name = ?, last_name = ?, job_title = ?, date_updated = now()
where id = ?;

select 
    id 'id', 
    first_name 'firstName',
    last_name 'lastName',
    job_title 'jobTitle',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.person
where id = ?
  `;

  connection.query(updateSql, [firstName, lastName, jobTitle, id, id], (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, null)
    } else {
      callback(null, res[1][0]);
    }
  });
};

const move = (personId: number, fromGroupId: number, toGroupId: number, callback: repositoryCallback) => {
  const moveSql = `
delete from ns_admin_app.group_person
where person_id = ? and group_id = ?;

insert into ns_admin_app.group_person
(person_id, group_id)
values (?, ?);

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
  `;

  const moveParams = [
    personId, fromGroupId,
    personId, toGroupId,
    fromGroupId, toGroupId,
    fromGroupId, toGroupId
  ];

  connection.beginTransaction(() => {
    connection.query(moveSql, moveParams, (sqlErr, res) => {
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
            callback(null, [ res[4][0], res[5][0] ]);
          }
        });
      }
    });
  })
};

const PersonRepository = {
  add,
  update,
  move
};

export default PersonRepository;