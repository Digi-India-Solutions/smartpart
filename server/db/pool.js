// const mongoose = require("mongoose");

// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.DB_URL)
//     .then(() => console.log("DB connected"))
//     .catch((err) => {
//       console.log(err);
//     });
// };

// module.exports = connectDatabase;





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