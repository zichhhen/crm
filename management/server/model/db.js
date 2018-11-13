let mysql = require('mysql');
let opt= {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crm'
};
let conn = mysql.createConnection(opt);
conn.connect((err,res)=>{
    if (err) {
        console.log(err);
    }
    else {
        console.log('success');
    } 
});
module.exports = conn;