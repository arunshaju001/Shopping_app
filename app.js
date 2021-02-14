const express = require('express');
const app = express();
const request = require('request');
var Mongoose = require('mongoose');
var BodyParser = require('body-parser')
var OrderService = require('./orderservice')
var dateFormat = require("dateformat");

const port = 3000;


// Static file path
app.use(express.static(__dirname+'/public'));
// Html or rending Path
app.set('views', './src/views');
// View engine specification
app.set('view engine', 'ejs');

var mongoDB = 'mongodb://127.0.0.1/Order_Management';
Mongoose.connect(mongoDB,{ useUnifiedTopology: true,  useNewUrlParser: true }, (err,client)=>{
    if(err){
        console.log("Error in connecting to database" , err)
    }
    else{
        console.log("Connected to Database")
    }
})

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())
app.listen(port ,(err) => {
    if(err) { console.log('error in api call')}
    else{ console.log ('App is running on port '+port)}
})

app.get('/',(req,res) => {
    res.render('main',{ message:'', title:'Place Order'})
})

app.post('/', (req,res)=>{
    // console.log("Body received from client" , req.body)
    OrderService.createOrder(req.body)
    .then(()=>{
        res.render('main', {message: 'Order Placed Successfully' ,title:'Place Order'});
    } , (error)=>{
        res.status(500).send(error)
    })
})


function finddays(date1){
    var date2 = new Date(); 
    var Diff_In_Time = date2.getTime() - date1.getTime(); 
      
    var Diff_In_Days = Math.trunc(Diff_In_Time / (1000 * 3600 * 24)); 
    // console.log(Diff_In_Days)
    if(Diff_In_Days == 0){
        return "In Progress"
    }
    else if(Diff_In_Days == 1){
        return "Dispatched"
    }
    else{
        return "Delivered"
    }
}


app.get('/admin',(req,res) => {
    var formatedresult ={}
    OrderService.displayall().then( async (result)=>{
        // console.log(result)
        formatedresult=result
        for(var i=0;i<formatedresult.length; i++){
            formatedresult[i].status = await finddays(formatedresult[i].date);
        }
    }, (error)=>{
        res.status(500).send(error)
    }).then(()=>{
        res.render('admin', { formatedresult})
    })
    
})

app.post('/send', (req,res)=>{

    // console.log("Body received from maildetail" , req.body)
    // console.log("Body received from maildetail" , req.params.id)
    // res.send("Success")
    OrderService.sendMailservice(req.body).then(  (result)=>{
        // console.log(result)
        res.redirect('/mailstatus');
    }, (error)=>{
        res.status(500).send(error)
    })
        
})  

app.get('/mailstatus' , (req,res) => {
    res.send('Success Mailsent')
})