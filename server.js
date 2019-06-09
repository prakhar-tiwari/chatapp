const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const messageRoute=require('./routes/message');
const authRoute=require('./routes/user');
const app=express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

app.use(authRoute);
app.use(messageRoute);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*',(req,res,next)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

mongoose.connect("mongodb url", {
    useNewUrlParser: true
})
.then(result=>{
    console.log("mongodb connected");
    const server=app.listen(port);
    const io=require('./socket').init(server);
    io.on('connection',socket=>{
        console.log("client connected " +socket.id);
    })
})
.catch(err=>{
    console.log(err);
})
