const mysql = require('mysql');
// MySQL connection configuration\\

const pool = mysql.createPool(
  {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port : 3308,
    password: 'wattpad2024',
    database: 'task_managerdb'
  }
)


pool.getConnection(async function (err, connection) {
  //console.log(connection);
    console.log("succes connection");
    connection.release();
});
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'wattpad2024',
//   database: 'task_managerdb',
// });

// async function fetchdate(){
 
//   db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });
//   var ddate = await db.query("Select now()");
//   return ddate;
  
// }


// Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });


module.exports = pool;