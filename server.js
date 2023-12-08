const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const cors = require('cors');
 
const http = require("http");

//const SocketIo = require('socket.io');

//const fileUpload = require('express-fileupload');
const app = express();

connectDB();



const AuthRoute = require('./app/routes/AuthRoute');
 



const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.options('*', cors()); 
app.use(express.json());
app.use('/static_files', express.static('uploads'))



app.use('/api/v1/auth', AuthRoute);
 
 



 



 

 

const PORT = process.env.PORT || 3001;


const server = app.listen(PORT, () => {
  
  console.log(`Server is running on port:http://localhost:${PORT}.`);
});

 
