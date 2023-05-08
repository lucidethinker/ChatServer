const app = require('./app')


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
    });
    


const http = require('http');


const server = http.createServer(app);

const port =process.env.PORT || 8000;



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
