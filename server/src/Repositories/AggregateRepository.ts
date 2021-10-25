import { connection } from "../DbConnection"
import { AggregateData } from "../Models";

const get = (callback: (err: any, data?: AggregateData) => void) => {
  const getSql = `
select 
	  id 'id', 
    first_name 'firstName',
    last_name 'lastName',
    job_title 'jobTitle',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.person;

select 
	  id 'id', 
    name 'name',
    parent_id 'parentId',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.group;
  `;

  connection.query(getSql, (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, undefined);
    } else {
      callback(null, {
        persons: res[0],
        groups: res[1],
        links: []
      });
    }
  });
};

const del = (callback: (err: any, res: any) => void) => {
  const getSql = `
delete from ns_admin_app.group_person;
delete from ns_admin_app.person;

update ns_admin_app.group
set parent_id = NULL;

delete from ns_admin_app.group;
  `;

  connection.query(getSql, (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, undefined);
    } else {
      callback(null, true);
    }
  });
};

const AggregateRepository = {
  get,
  del
};

export default AggregateRepository;