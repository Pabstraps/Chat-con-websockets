import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io'
import viewRouter from './routes/views.router.js'

const app = express();
const PORT = process.env.PORT || 9090;


//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Uso de vista de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');


// Indicamos que vamos a trabajar con archivos estaticos
app.use(express.static(__dirname + "/public"))



// Router
app.use('/', viewRouter)


const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})

// Instanciamos socket.io
const socketServer = new Server(httpServer);


const messages = [];
socketServer.on('connection', socket => {
    socketServer.emit('messagesLog', messages);

    
    socket.on("message", data => {
        messages.push(data)

        socketServer.emit('messageLogs', messages);
    });


    socket.on('userConnected', data =>{
        console.log(data);
        socket.broadcast.emit('userConnected', data.user)
    })

    socket.on('closeChat', data=>{
        if (data.close ==="close")
        socket.disconnect();
    })

})




