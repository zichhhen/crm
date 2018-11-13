let index = require('../model/index.js');
let util = require('../lib/util.js');
import * as mysql from 'mysql';
let conn = require('../model/db');
var userAddSql= "INSERT INTO user(id,name,sex,age) VALUES(?,?,?,?)";
var userAddSql_Params=['413','just','man','9'];

var showuser="SELECT * FROM test";
var deleteuserSql="DELETE FROM user WHERE name='hehe'"

//调用查询方法
conn.query(showuser,function(err,result){
    if(err) throw err;
    console.log('show result:',result);
    console.log('show result:',result.affectedRows);
});
// console.log(conn);
module.exports = function(req, res){
    res.render('management/page/main.tpl', index.getData());
};