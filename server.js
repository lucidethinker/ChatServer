const app = require('./app')
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 

dotenv.config({path:'./config.env',
})

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
    });
    


const http = require('http');


const server = http.createServer(app);

const port =process.env.PORT || 8000;

const DB = process.env.DBURI.replace("<PASSWORD>",process.env.DBPASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,

}).then((con)=>
{
    console.log("success")
}).catch((err)=>{
    console.log(err);
});


server.listen(port, () => {
    console.log(`App running on port ${port} ...`);
    }
);

process.on("unhandledRejection",(err)=>{
    console.log(err);
    server.close(()=>{
        process.exit(1);
    })
})
