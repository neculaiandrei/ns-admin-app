import { connection } from "../DbConnection"

const add = (firstName: string, lastName: string, jobTitle: string, callback: (err, data) => void) => {
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

const PersonRepository = {
  add
};

export default PersonRepository;