var index = require('../model/index.js');
var util = require('../lib/util.js');
import db from '../model/db';
module.exports = function(req, res){
    res.render('management/page/main.tpl', index.getData());
    // console.log(ret);
};