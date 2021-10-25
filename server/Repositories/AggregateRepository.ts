import { AllData } from "../Data";
import { connection } from "../DbConnection"

const get = (callback: (err, data: AllData) => void) => {
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
    parentId 'parentId',
    date_created 'dateCreated',
    date_updated 'dateUpdated'
from ns_admin_app.group;
  `;

  connection.query(getSql, (err, res) => {
    if (err) {
      console.log(err.message);
      callback(err, null)
    } else {
      callback(null, {
        persons: res[0],
        groups: res[1],
        links: []
      });
    }
  });
};

const AggregateRepository = {
  get
};

export default AggregateRepository;