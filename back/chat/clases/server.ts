import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

export default class Server {
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;
    constructor(){
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.puerto = process.env.PORT || 3700;
    }
    start(){
        this.httpServer.listen(this.puerto,()=>{
            console.log("Servidor iniciado correctamente. Puerto => " + this.puerto);        
        });
    }
}