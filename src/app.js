import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/view.router.js';
import { messageModel } from './dao/models/messages.model.js';
import { Server } from "socket.io"
import mongoose from 'mongoose';


const app = express();

const httpServer = app.listen(8080, () => {
    console.log("Server Corriendo en: http://localhost:8080/");
});
const io = new Server(httpServer);
mongoose.set('strictQuery', false);
const connection = mongoose.connect('mongodb+srv://UserAurin:aurin39541451@ecommerce.s149c3o.mongodb.net/test?retryWrites=true&w=majority');

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/view', viewRouter);



try {

    async function getLogs() {
        return await messageModel.find();
      }

    /*app.get('/products', async (req, res) => {

        const { limit } = req.query;

        const resultado = await prodManager.getProducts();
        if (typeof limit === "string") {

            let arrayresult = [];
            for (let i = 0; i < parseInt(limit); i++) {
                arrayresult.push(resultado[i]);

            }
            res.send(arrayresult);

        } else {

            res.send(resultado);
        }

    });*/

    /*app.get('/products/:pId', async (req, res) => {

        const idSolicitado = req.params.pId;
        const arrayProductos = prodManager.getProducts();

        if (parseInt(idSolicitado) <= arrayProductos.length) {

            const producSolicitado = prodManager.getProductById(idSolicitado);

            res.send(producSolicitado);
        } else {

            res.send(`El producto con ID:${idSolicitado} no existe`);
        }

    });*/

    // app.listen(8080, () => console.log('Server Corriendo en: http://localhost:8080/'));
    io.on("connection", async (socket) => {
        console.log("New client connected");

        const logs = await getLogs();
        io.emit("log", { logs });

        socket.on("message", async (data) => {
            await messageModel.create({ user: data.user, message: data.message });
            const logs = await getLogs();
            io.emit("log", { logs });
        });
        socket.on("userAuth", (data) => {
            socket.broadcast.emit("newUser", data);
        });
    });
} catch (error) {
    console.log(error);
};

export default io;