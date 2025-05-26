const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;


// import mongoose from 'mongoose';

// const connectDb = async (URL) => {
//     try {
//         const connection = await mongoose.connect(URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log("manovedya MongoDB connected:", connection.connection.host);
//     } catch (error) {
//         console.error("MongoDB connection failed:", error);
//         process.exit(1); // Exit the process with failure
//     }
// };

// export { connectDb };


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