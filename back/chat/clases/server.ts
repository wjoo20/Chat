import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { Usuarios } from './usuarios';
import { Usuario } from './usuario';

export default class Server {
    public app:express.Application;
    public puerto:any;
    public httpServer:http.Server;
    public io:socketIO.Server;
    public usuariosConectados:Usuarios = new Usuarios();
    constructor(){
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.puerto = process.env.PORT || 3700;
        this.escucharSockets();
    }
    escucharSockets(){
        console.log("Escuchando sockets");
        this.io.on('connect',(cliente)=>{
            
            console.log(`${cliente.id} se ha conectado`);

            //Creo un usuario con el id de la maquina que se conecta
            let usuario = new Usuario(cliente.id);

            //Agrego el usuario recientemente conectado a la lista de usuarios
            this.usuariosConectados.agregar(usuario);

            //Emitir el evento 'usuarios-activos' enviando todos los usuarios activos a quienes están suscritos
            this.io.emit('usuarios-activos',this.usuariosConectados.getLista());    


            cliente.on('disconnect',()=>{

                //Borro el usuario de la lista de usuarios conectados cuando este se desconecta
                this.usuariosConectados.borrarUsuario(cliente.id);

                //Emito el evento usuarios-activos para que todos vean la nueva lista de usuarios activos
                console.log("desconectado");
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
            });
            cliente.on('enviar-mensaje',(payload)=>{
                console.log(payload);
                this.io.emit('mensaje-nuevo',payload);
            });
            cliente.on('configurar-usuario',(usuario)=>{
               this.usuariosConectados.actualizarNombre(cliente.id,usuario.nombre);
               console.log(this.usuariosConectados.getLista());
            });

            cliente.on("cerrar-sesion",()=>{
                this.usuariosConectados.actualizarNombre(cliente.id,"sin-nombre");
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
            })

            cliente.on('obtener-usuarios',()=>{
                //this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
                //this.io.in(id) => emite un socket para un cliente en específico dado su id
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
             });
        });
    }
    start(){
        this.httpServer.listen(this.puerto,()=>{
            console.log("Servidor iniciado correctamente. Puerto => " + this.puerto);        
        });
    }
}