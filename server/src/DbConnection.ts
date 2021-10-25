import mysql from 'mysql';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nsadminapp',
  password: 'nsadminapp',
  database: 'ns_admin_app',
  multipleStatements: true
})