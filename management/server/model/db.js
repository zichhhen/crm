let mysql = require('mysql');
let opt= {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crm'
};
let conn = mysql.createConnection(opt);
let ret;
conn.connect((err,res)=>{
    ret = {
        errno:200,
        data:res
    };
});