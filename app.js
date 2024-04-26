const express = require("express");
const app = express();
const socketIo = require('socket.io');
const http = require('http');
app.use(express.json());

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});

const mongoose = require("mongoose");
const server = http.createServer(app);
const io = socketIo(server);

// Define a server-originated event to emit
const serverEvent = 'serverEvent';
const serverEventData = { message: 'Hello from the server!' };

// Listen for socket connection
io.on('connection', (socket) => {
    console.log('A client connected.');

    // Emit the server-originated event when a client connects
    socket.emit(serverEvent, serverEventData);

    // Listen for client-originated events
    socket.on('clientEvent', (data) => {
        console.log('Received client event:', data);
    });
});
//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gamecrio",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

module.exports = app;