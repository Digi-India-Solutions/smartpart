//////////sir/////////////////
// var mysql = require("mysql")
// var pool = mysql.createPool({
//     host: "localhost",
//     port:3306,
//     user:'root',
//     password:'Admin@@1234',
//     database:'smart_parts',
//     connectionLimit:100,
//     multipleStatements:true
// })

// module.exports=pool
////////////////////AASIB/////////////////

var mysql = require("mysql")
var pool = mysql.createPool({
    host: "localhost",
    port:3306,
    user:'root',
    password:'1234',
    database:'smart_parts',
    connectionLimit:100,
    multipleStatements:true
})

module.exports=pool